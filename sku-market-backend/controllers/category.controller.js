const catchAsyncErrors = require('../lib/catchAsyncErrors');
const Product = require('../models/product.model');

exports.topCategories = catchAsyncErrors(async (req, res, next) => {
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    let marketplace = req.query.marketplace || 'noon-ksa';
    marketplace = marketplace.split('-').join('/');

    const brands = await Product.aggregate(
        [
            {
                $match: {
                    sku_marketplace: marketplace,
                },
            },
            {
                $group: {
                    _id: '$category_en',
                    sku: { $sum: 1 },

                    marketplace: {
                        $push: '$sku_marketplace',
                    },
                    sku_rate: { $sum: '$sku_rate' },
                    brand: { $addToSet: '$brand_en' },
                    type: { $addToSet: '$sku_type_en' },
                    sub_type: { $addToSet: '$sku_sub_type_en' },
                    soh: { $sum: '$estimated_SOH' },
                    stores: {
                        $sum: {
                            $size: {
                                $ifNull: ['$stores', []],
                            },
                        },
                    },
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
                },
            },
            {
                $sort: { sku_rate: -1 },
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    category: '$_id',
                    sku: 1,
                    brand: { $size: '$brand' },
                    type: { $size: '$type' },
                    sub_type: { $size: '$sub_type' },
                    soh: 1,
                    stores: 1,
                    is_live: 1,
                    is_not_live: 1,
                    ff_mp: 1,
                    ff_store: 1,
                    marketplace: {
                        $arrayElemAt: [{ $slice: ['$marketplace', 1] }, 0],
                    },
                },
            },
        ],
        {
            allowDiskUse: true,
        }
    )
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        success: true,
        brands,
    });
});

// Analytics for a specific category
exports.analyticsBuyCategory = catchAsyncErrors(async (req, res, next) => {
    const categoryAnalytics = await Product.aggregate([
        {
            $match: {
                category_en: req.params.category,
            },
        },
        {
            $group: {
                _id: '$category_en',
                products: { $sum: 1 },
                live: { $sum: { $cond: ['$is_live', 1, 0] } },
                types: {
                    $addToSet: '$sku_type_en',
                },
                subTypes: {
                    $addToSet: '$sku_sub_type_en',
                },
                brand: {
                    $addToSet: '$brand_en',
                },
                notLive: {
                    $sum: { $cond: [{ $not: '$is_live' }, 1, 0] },
                },
                express: {
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
                stores: {
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
                stocks: { $sum: '$estimated_SOH' },
            },
        },
        {
            $project: {
                _id: '$_id',
                live: '$live',
                stocks: '$stocks',
                stores: '$stores',
                notLive: '$notLive',
                products: '$products',
                express: '$express',
                products: '$products',
                types: { $size: '$types' },
                subTypes: { $size: '$subTypes' },
                brand: { $size: '$brand' },
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: categoryAnalytics[0] || {},
    });
});

// Analytics for all categories
exports.categoryAnalytics = catchAsyncErrors(async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;

    const marketplace = req.query.marketplace;

    // wait for both queries to finish
    const data = await Product.aggregate([
        // if marketplace is provided, filter by marketplace
        {
            $match: {
                sku_marketplace: marketplace ? marketplace : { $exists: true },
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
        // keep only stores.store_id
        {
            $project: {
                _id: 0,
                stores: {
                    $map: {
                        input: '$stores',
                        as: 'store',
                        in: '$$store.store_id',
                    },
                },
                is_live: 1,
                buy_box_sku_fulfillment_type: 1,
                estimated_SOH: 1,
                category_en: 1,
                sku_marketplace: 1,
                sku_rank: 1,
                sku_type_en: 1,
                sku_sub_type_en: 1,
                brand_en: 1,
            },
        },
        // count the number of stores
        {
            $project: {
                stores: { $size: { $setUnion: '$stores' } },
                is_live: 1,
                buy_box_sku_fulfillment_type: 1,
                estimated_SOH: 1,
                category_en: 1,
                sku_marketplace: 1,
                sku_rank: 1,
                sku_type_en: 1,
                sku_sub_type_en: 1,
                brand_en: 1,
            },
        },
        // group by category
        {
            $group: {
                _id: '$category_en',
                sku_rank: { $sum: '$sku_rank' },
                sku: { $sum: 1 },
                brand: {
                    $addToSet: '$brand_en',
                },
                type: {
                    $addToSet: '$sku_type_en',
                },
                sub_type: {
                    $addToSet: '$sku_sub_type_en',
                },
                soh: { $sum: '$estimated_SOH' },
                is_live: {
                    $sum: { $cond: ['$is_live', 1, 0] },
                },
                is_not_live: {
                    $sum: { $cond: [{ $not: '$is_live' }, 1, 0] },
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
                stores: {
                    $sum: '$stores',
                },
                marketplace: {
                    $push: '$sku_marketplace',
                },
            },
        },
        // add the fields we need
        {
            $project: {
                _id: 0,
                id: '$_id',
                category: '$_id',
                rank: '$sku_rank',
                sku: '$sku',
                brand: { $size: '$brand' },
                type: { $size: '$type' },
                sub_type: { $size: '$sub_type' },
                stocks: '$soh',
                live: '$is_live',
                not_live: '$is_not_live',
                ff_store: '$ff_store',
                ff_mp: '$ff_mp',
                stores: '$stores',
                marketplace: {
                    $arrayElemAt: [
                        '$marketplace',
                        {
                            $indexOfArray: [
                                '$marketplace',
                                {
                                    $min: '$marketplace',
                                },
                            ],
                        },
                    ],
                },
            },
        },

        // sort by sku_rank
        {
            $sort: { rank: -1 },
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

/* 

  {
            $project: {
                stores: {
                    $size: {
                        $ifNull: ['$stores', []],
                    },
                },
                is_live: 1,
                buy_box_sku_fulfillment_type: 1,
                estimated_SOH: 1,
                category_en: 1,
                sku_marketplace: 1,
                sku_rank: 1,
                sku_type_en: 1,
                sku_sub_type_en: 1,
                brand_en: 1,
            },
        },
        {
            $group: {
                _id: '$category_en',
                sku: { $sum: 1 },
                stores: { $sum: '$stores' },
                rank: { $sum: '$sku_rank' },
                stocks: { $sum: '$estimated_SOH' },
                live: { $sum: { $cond: ['$is_live', 1, 0] } },
                not_live: { $sum: { $cond: [{ $not: '$is_live' }, 1, 0] } },
                noon_uae: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'noon/uae'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                noon_egypt: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'noon/egypt'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                noon_ksa: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'noon/ksa'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                amazon_uae: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'amazon/uae'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                amazon_egypt: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'amazon/egypt'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                amazon_ksa: {
                    $sum: {
                        $cond: [
                            {
                                $eq: ['$sku_marketplace', 'amazon/ksa'],
                            },
                            1,
                            0,
                        ],
                    },
                },
                types: {
                    $addToSet: '$sku_type_en',
                },
                sub_types: {
                    $addToSet: '$sku_sub_type_en',
                },
                brand: {
                    $addToSet: '$brand_en',
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
            },
        },
        {
            $project: {
                _id: 0,
                sku: 1,
                rank: 1,
                live: 1,
                ff_mp: 1,
                stores: 1,
                stocks: 1,
                id: '$_id',
                not_live: 1,
                noon_uae: 1,
                noon_ksa: 1,
                ff_store: 1,
                noon_egypt: 1,
                amazon_uae: 1,
                amazon_ksa: 1,
                amazon_egypt: 1,
                category: '$_id',
                types: {
                    $size: '$types',
                },
                sub_types: {
                    $size: '$sub_types',
                },
                brand: {
                    $size: '$brand',
                },
            },
        },
        {
            $sort: { rank: -1 },
        },

*/

/* 
 // group by category
        {
            $group: {
                _id: '$category_en',
                sku_rank: { $sum: '$sku_rank' },
                sku: { $sum: 1 },
                brand: {
                    $addToSet: '$brand_en',
                },
                type: {
                    $addToSet: '$sku_type_en',
                },
                sub_type: {
                    $addToSet: '$sku_sub_type_en',
                },
                soh: { $sum: '$estimated_SOH' },
                is_live: {
                    $sum: { $cond: ['$is_live', 1, 0] },
                },
                is_not_live: {
                    $sum: { $cond: [{ $not: '$is_live' }, 1, 0] },
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
                stores: {
                    $addToSet: '$stores',
                },
            },
        },
        // add the fields we need
        {
            $project: {
                _id: '$_id',
                sku: '$sku',
                soh: '$soh',
                sku_rank: '$sku_rank',
                ff_store: '$ff_store',
                is_live: '$is_live',
                is_not_live: '$is_not_live',
                ff_mp: '$ff_mp',
                brand: { $size: '$brand' },
                type: { $size: '$type' },
                sub_type: { $size: '$sub_type' },
                stores: {
                    $reduce: {
                        input: '$stores',
                        initialValue: [],
                        in: { $concatArrays: ['$$value', '$$this'] },
                    },
                },
            },
        },

         // sort by sku
        {
            $sort: { sku_rank: -1 },
        },
*/
