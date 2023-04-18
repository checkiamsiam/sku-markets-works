const catchAsyncErrors = require('../lib/catchAsyncErrors');
const RequestProduct = require('../models/requestProduct.model');
const AppError = require('../util/appError');
const Product = require('../models/product.model');

// create a requestProduct
exports.createOrUpdate = catchAsyncErrors(async (req, res, next) => {
    const sku = req.body.sku;
    const user = req.user._id;

    // check if sku is an array
    if (!Array.isArray(sku)) return next(new AppError('sku must be an array'));

    // check if sku is empty
    if (sku.length === 0) return next(new AppError('sku must not be empty'));

    // check if sku is an array of strings
    for (const item of sku) {
        if (typeof item !== 'string')
            return next(new AppError('sku must be an array of strings'));
    }

    await RequestProduct.findOneAndUpdate(
        { user },
        { $addToSet: { sku: { $each: sku } } },
        { new: true, upsert: true }
    );

    res.status(204).send();
});

// remove  requestProducts
exports.removeSku = catchAsyncErrors(async (req, res, next) => {
    const user = req.user._id;
    const sku = req.body.sku;

    // check if sku is an array
    if (!Array.isArray(sku)) {
        return next(new AppError('sku must be an array'));
    }

    // check if sku is empty
    if (sku.length === 0) {
        return next(new AppError('sku must not be empty'));
    }

    // check if sku is an array of strings
    for (const item of sku) {
        if (typeof item !== 'string') {
            return next(new AppError('sku must be an array of strings'));
        }
    }

    await RequestProduct.findOneAndUpdate(
        { user },
        { $pull: { sku: { $in: sku } } },
        { new: true }
    );

    res.status(204).send();
});

// get those requestProducts that have no product
exports.getEmptySku = catchAsyncErrors(async (req, res, next) => {
    const data = await RequestProduct.aggregate([
        // kept only sku
        {
            $project: {
                sku: 1,
            },
        },
        // unwind the sku array
        {
            $unwind: '$sku',
        },
        // populate the product
        {
            $lookup: {
                from: 'products',
                localField: 'sku',
                foreignField: 'sku',
                as: 'product',
            },
        },
        // kept only those that have no product
        {
            $match: {
                product: { $size: 0 },
            },
        },
        // make the sku an array
        {
            $group: {
                _id: null,
                sku: { $addToSet: '$sku' },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);

    // if no data return empty array
    if (data.length === 0) {
        return res.status(200).json({
            success: true,
            total: 0,
            sku: [],
        });
    }

    res.status(200).json({
        success: true,
        total: data[0].sku.length,
        sku: data[0].sku,
    });
});

// new way to get the requestProducts
exports.getUserSku = catchAsyncErrors(async (req, res, next) => {
    const user = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const query = req.query;
    const newQuery = { ...query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete newQuery[el]);

    // replace gte|gt|lte|lt with $gte|$gt|$lte|$lt
    let queryStr = JSON.stringify(newQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // convert queryStr valid javascript object
    const queryObj = JSON.parse(queryStr);
    // remove quotes from  numbers and booleans
    Object.keys(queryObj).forEach((key) => {
        if (queryObj[key] === 'true') {
            queryObj[key] = true;
        } else if (queryObj[key] === 'false') {
            queryObj[key] = false;
        } else if (!isNaN(queryObj[key])) {
            queryObj[key] = parseInt(queryObj[key]);
        }

        // if key is { '$gt': '10' } then convert it to { '$gt': 10 }
        if (typeof queryObj[key] === 'object') {
            Object.keys(queryObj[key]).forEach((el) => {
                if (!isNaN(queryObj[key][el])) {
                    queryObj[key][el] = parseInt(queryObj[key][el]);
                }
            });
        }
    });

    // sort by
    let sort = req.query.sort || 'createdAt';
    sort = sort.split(',').join(' ');

    // create sort object
    const sortObj = {};
    sort.split(' ').forEach((el) => {
        if (el.startsWith('-')) {
            sortObj[el.slice(1)] = -1;
        } else {
            sortObj[el] = 1;
        }
    });

    // select fields
    let fields = req.query.fields || 'sku';
    fields = fields.split(',').join(' ');

    // create fields object
    const fieldsObj = {};
    fields.split(' ').forEach((el) => {
        fieldsObj[el] = 1;
    });

    // get the requestProducts
    const data = await RequestProduct.aggregate([
        { $match: { user } },
        // keep only sku field
        {
            $project: {
                sku: 1,
            },
        },
        // unwind the sku field
        {
            $unwind: {
                path: '$sku',
                preserveNullAndEmptyArrays: true,
            },
        },
        // lookup the product
        {
            $lookup: {
                from: 'products',
                localField: 'sku',
                foreignField: 'sku',
                as: 'product',
            },
        },
        // unwind the product
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'product._id': {
                    $ne: null,
                },
            },
        },
        // unwrap the product
        {
            $replaceRoot: {
                newRoot: '$product',
            },
        },

        // sort by
        {
            $sort: sortObj,
        },
        //use queryStr to filter the data
        {
            $match: queryObj,
        },
        // select fields
        {
            $project: fieldsObj,
        },
        // add new id field
        {
            $addFields: {
                id: '$_id',
            },
        },
        // add a new field to the root as the count of the  total documents
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: 'total' }],
            },
        },
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
    });
});

//top brands
exports.getTopBrands = catchAsyncErrors(async (req, res, next) => {
    const filter = req.query.filter || 'brand_en';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await RequestProduct.aggregate([
        // keep only sku field
        {
            $project: {
                sku: 1,
            },
        },
        // unwind the sku field
        {
            $unwind: {
                path: '$sku',
                preserveNullAndEmptyArrays: true,
            },
        },
        // lookup the product
        {
            $lookup: {
                from: 'products',
                localField: 'sku',
                foreignField: 'sku',
                as: 'product',
            },
        },
        // unwind the product
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'product._id': {
                    $ne: null,
                },
            },
        },
        // unwrap the product
        {
            $replaceRoot: {
                newRoot: '$product',
            },
        },
        // group by brand
        {
            $group: {
                _id: `$${filter}`,
                sku: { $sum: 1 },
                marketplace: {
                    $push: '$sku_marketplace',
                },
                sku_rate: { $sum: '$sku_rate' },
                brand: { $addToSet: '$brand_en' },
                category: { $addToSet: '$category_en' },
                type: { $addToSet: '$sku_type_en' },
                sub_type: { $addToSet: '$sku_sub_type_en' },
                soh: { $sum: '$estimated_SOH' },

                is_live: {
                    $sum: {
                        $cond: [{ $eq: ['$is_live', true] }, 1, 0],
                    },
                },
                is_not_live: {
                    $sum: {
                        $cond: [{ $eq: ['$is_live', false] }, 1, 0],
                    },
                },
                ff_mp: {
                    $sum: {
                        $cond: [
                            {
                                $eq: [
                                    '$buy_box_sku_fulfillment_type',
                                    'Fulfilled by MP',
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                ff_store: {
                    $sum: {
                        $cond: [
                            {
                                $eq: [
                                    '$buy_box_sku_fulfillment_type',
                                    'Fulfilled by Stores',
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                // keep the stores field as it is
                stores: { $push: '$stores' },
            },
        },
        // get the top marketplace
        {
            $addFields: {
                marketplace: {
                    $arrayElemAt: [
                        '$marketplace',
                        {
                            $indexOfArray: [
                                '$marketplace',
                                {
                                    $max: '$marketplace',
                                },
                            ],
                        },
                    ],
                },
            },
        },
        // unwind the stores field
        {
            $unwind: {
                path: '$stores',
                preserveNullAndEmptyArrays: true,
            },
        },
        // unwind the stores field again
        {
            $unwind: {
                path: '$stores',
                preserveNullAndEmptyArrays: true,
            },
        },
        // populate the stores field
        {
            $lookup: {
                from: 'stores',
                localField: 'stores',
                foreignField: '_id',
                as: 'stores',
            },
        },
        // unwind the stores field again
        {
            $unwind: {
                path: '$stores',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'stores._id': {
                    $ne: null,
                },
            },
        },
        // group by _id
        {
            $group: {
                _id: '$_id',
                // push unique stores to the stores field
                stores: { $addToSet: '$stores.store_id' },
                sku: { $first: '$sku' },
                sku_rate: { $first: '$sku_rate' },
                brand: { $first: '$brand' },
                category: { $first: '$category' },
                type: { $first: '$type' },
                sub_type: { $first: '$sub_type' },
                soh: { $first: '$soh' },
                is_live: { $first: '$is_live' },
                is_not_live: { $first: '$is_not_live' },
                ff_mp: { $first: '$ff_mp' },
                ff_store: { $first: '$ff_store' },
                marketplace: { $first: '$marketplace' },
            },
        },
        {
            $project: {
                _id: 0,
                id: '$_id',
                sku: 1,
                category: { $size: '$category' },
                brand: { $size: '$brand' },
                type: { $size: '$type' },
                sub_type: { $size: '$sub_type' },
                soh: 1,
                stores: { $size: '$stores' },
                is_live: 1,
                is_not_live: 1,
                ff_mp: 1,
                ff_store: 1,
                marketplace: 1,
            },
        },
        // soh field is floding number so we need to make it integer
        {
            $addFields: {
                soh: { $toInt: '$soh' },
            },
        },
        // sort by id field
        {
            $sort: {
                id: 1,
            },
        },

        // add a new field to the root as the count of the  total documents
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: 'total' }],
            },
        },
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
        // data: data,
    });
});

/* 
        {
            $group: {
                _id: '$sku',
                count: { $sum: 1 },
                requestProducts: { $push: '$$ROOT' },
            },
        },

         {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true,
            },
        },
          // remove the null values
        {
            $match: {
                _id: {
                    $ne: null,
                },
            },
        },
        // populate the product field
         {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product',
            },
        },
        // unwrap the product
        {
            $replaceRoot: {
                newRoot: '$product',
            },
        },
         // add the total
        {
            $addFields: {
                total: { $size: '$sku' },
            },
        },
         // add a new field to the root as the count of the  total documents
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: 'total' }],
            },
        },
*/

//store competitors
exports.getStoreCompetitors = catchAsyncErrors(async (req, res, next) => {
    const user = req.user._id;
    const store_id = req.query.store_id || '37245';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await RequestProduct.aggregate([
        { $match: { user } },
        // keep only sku field
        {
            $project: {
                sku: 1,
            },
        },
        // unwind the sku field
        {
            $unwind: {
                path: '$sku',
                preserveNullAndEmptyArrays: true,
            },
        },
        // lookup the product
        {
            $lookup: {
                from: 'products',
                localField: 'sku',
                foreignField: 'sku',
                as: 'product',
            },
        },
        // unwind the product
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'product._id': {
                    $ne: null,
                },
            },
        },
        // unwrap the product
        {
            $replaceRoot: {
                newRoot: '$product',
            },
        },
        // keep only stores field
        {
            $project: {
                stores: 1,
            },
        },
        // unwind the stores field
        {
            $unwind: {
                path: '$stores',
                preserveNullAndEmptyArrays: true,
            },
        },
        // populate the stores field
        {
            $lookup: {
                from: 'stores',
                localField: 'stores',
                foreignField: '_id',
                as: 'store',
            },
        },
        // unwind the store field
        {
            $unwind: {
                path: '$store',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'store._id': {
                    $ne: null,
                },
            },
        },
        // unwrap the store
        {
            $replaceRoot: {
                newRoot: '$store',
            },
        },
        // remove documents that are in the store_id
        {
            $match: {
                store_id: {
                    $ne: store_id,
                },
            },
        },
        // group by store_name
        {
            $group: {
                _id: '$store_name',
                soh: { $sum: '$store_soh' },
                skus: { $sum: 1 },
                rating: { $avg: '$store_rating' },
            },
        },
        // add id field remove _id field
        {
            $addFields: {
                id: '$_id',
            },
        },
        {
            $project: {
                _id: 0,
            },
        },

        // add a new field to the root as the count of the  total documents
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: 'total' }],
            },
        },
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
    });
});

// Opportunity To BuyBox
exports.getOpportunityToBuyBox = catchAsyncErrors(async (req, res, next) => {
    const user = req.user._id;
    const store_id = req.query.store_id || '37245';

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const data = await RequestProduct.aggregate([
        { $match: { user } },
        // keep only sku field
        {
            $project: {
                sku: 1,
            },
        },
        // unwind the sku field
        {
            $unwind: {
                path: '$sku',
                preserveNullAndEmptyArrays: true,
            },
        },
        // lookup the product
        {
            $lookup: {
                from: 'products',
                localField: 'sku',
                foreignField: 'sku',
                as: 'product',
            },
        },
        // unwind the product
        {
            $unwind: {
                path: '$product',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                'product._id': {
                    $ne: null,
                },
            },
        },
        // unwrap the product
        {
            $replaceRoot: {
                newRoot: '$product',
            },
        },
        // keep  stores,sku,category_en,current_price,brand_en,price_change,getTopBottomPrice fields
        {
            $project: {
                stores: 1,
                sku: 1,
                category_en: 1,
                current_price: 1,
                brand_en: 1,
                price_change: 1,
                getTopBottomPrice: 1,
                all_images: 1,
                sku_marketplace: 1,
            },
        },
        // unwind the stores field
        {
            $unwind: {
                path: '$stores',
                preserveNullAndEmptyArrays: true,
            },
        },
        // remove the null values
        {
            $match: {
                stores: {
                    $ne: null,
                },
            },
        },
        // add new field max_price and min_price
        {
            $addFields: {
                max_price: '$getTopBottomPrice.topPrice.last30Days',
                min_price: '$getTopBottomPrice.bottomPrice.last30Days',
            },
        },
        // remove getTopBottomPrice field
        {
            $project: {
                getTopBottomPrice: 0,
            },
        },
        // populate the stores field
        {
            $lookup: {
                from: 'stores',
                localField: 'stores',
                foreignField: '_id',
                as: 'store',
            },
        },
        // unwind the store field
        {
            $unwind: {
                path: '$store',
                preserveNullAndEmptyArrays: true,
            },
        },
        // keep only those documents that store_id is equal to the store_id and store_offer_rank is greater than 1
        {
            $match: {
                'store.store_id': store_id,
                'store.store_offer_rank': { $gt: 1 },
            },
        },
        // remove the store field
        {
            $project: {
                store: 0,
            },
        },
        // remove documents that are _id is same
        {
            $group: {
                _id: '$_id',
                sku: { $first: '$sku' },
                category_en: { $first: '$category_en' },
                current_price: { $first: '$current_price' },
                brand_en: { $first: '$brand_en' },
                price_change: { $first: '$price_change' },
                max_price: { $first: '$max_price' },
                min_price: { $first: '$min_price' },
                all_images: { $first: '$all_images' },
                sku_marketplace: { $first: '$sku_marketplace' },
            },
        },
        // add a new field to the root as the count of the  total documents
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                total: [{ $count: 'total' }],
            },
        },
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
    });
});
