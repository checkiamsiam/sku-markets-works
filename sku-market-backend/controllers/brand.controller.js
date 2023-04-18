const catchAsyncErrors = require('../lib/catchAsyncErrors');
const Product = require('../models/product.model');
const AppError = require('../util/appError');
const { getAll } = require('../util/factory');

exports.topBrands = catchAsyncErrors(async (req, res, next) => {
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const brands = await Product.aggregate(
        [
            {
                $group: {
                    _id: '$brand_en',
                    sku: { $sum: 1 },
                    marketplace: {
                        $push: '$sku_marketplace',
                    },
                    sku_rate: { $sum: '$sku_rate' },
                    category: { $addToSet: '$category_en' },
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
                    brand: '$_id',
                    sku: 1,
                    category: { $size: '$category' },
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

    // total brands
    const totalBrands = await Product.aggregate([
        {
            $group: {
                _id: '$brand_en',
            },
        },

        {
            $count: 'total',
        },
    ]);

    res.status(200).json({
        success: true,
        total: totalBrands[0].total,
        result: brands.length,
        data: brands,
    });
});
