const catchAsyncErrors = require("../lib/catchAsyncErrors");
const Product = require("../models/product.model");

// market place analytics
exports.AnalyticsByMarketPlace = catchAsyncErrors(async (req, res, next) => {
  let marketplace = req.params.marketplace || "noon-ksa";
  marketplace = marketplace.split("-").join("/");

  // old query

  /* const marketPlaceAnalytics = await Product.aggregate(
        [
            {
                $match: {
                    sku_marketplace: marketplace,
                },
            },
            {
                $group: {
                    _id: '$sku_marketplace',
                    products: { $sum: 1 },
                    live: { $sum: { $cond: ['$is_live', 1, 0] } },
                    notLive: { $sum: { $cond: [{ $not: '$is_live' }, 1, 0] } },
                    stocks: { $sum: '$estimated_SOH' },
                    categories: {
                        $addToSet: '$category_en',
                    },
                    types: {
                        $addToSet: '$sku_type_en',
                    },
                    subTypes: {
                        $addToSet: '$sku_sub_type_en',
                    },
                    brands: {
                        $addToSet: '$brand_en',
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    live: '$live',
                    stocks: '$stocks',
                    notLive: '$notLive',
                    products: '$products',
                    types: { $size: '$types' },
                    subTypes: { $size: '$subTypes' },
                    categories: { $size: '$categories' },
                    brands: { $size: '$brands' },
                },
            },
        ],
        {
            allowDiskUse: true,
        }
    ); */

  const data = await Product.aggregate(
    [
      {
        $match: {
          sku_marketplace: marketplace,
        },
      },
      {
        $lookup: {
          from: "stores",
          localField: "stores",
          foreignField: "_id",
          as: "stores",
        },
      },
      {
        $project: {
          _id: 1,
          stores: {
            $map: {
              input: "$stores",
              as: "store",
              in: "$$store.store_id",
            },
          },
          sku_marketplace: 1,
          sku_type_en: 1,
          sku_sub_type_en: 1,
          brand_en: 1,
          category_en: 1,
          is_live: 1,
          estimated_SOH: 1,
          buy_box_sku_fulfillment_type: 1,
        },
      },
      {
        $group: {
          _id: "$sku_marketplace",
          products: { $sum: 1 },
          live: { $sum: { $cond: ["$is_live", 1, 0] } },
          notLive: { $sum: { $cond: [{ $not: "$is_live" }, 1, 0] } },
          stocks: { $sum: "$estimated_SOH" },
          categories: {
            $addToSet: "$category_en",
          },
          types: {
            $addToSet: "$sku_type_en",
          },
          subTypes: {
            $addToSet: "$sku_sub_type_en",
          },
          brands: {
            $addToSet: "$brand_en",
          },
          stores: {
            $addToSet: "$stores",
          },
          ff_mp: {
            $sum: {
              $cond: [
                {
                  $eq: ["$buy_box_sku_fulfillment_type", "Fulfilled by MP"],
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
                  $eq: ["$buy_box_sku_fulfillment_type", "Fulfilled by Stores"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      // need to flatten the stores array  and then count the unique values
      {
        $project: {
          _id: 0,
          id: "$_id",
          live: "$live",
          stocks: "$stocks",
          notLive: "$notLive",
          products: "$products",
          types: { $size: "$types" },
          brands: { $size: "$brands" },
          subTypes: { $size: "$subTypes" },
          categories: { $size: "$categories" },
          ff_mp: 1,
          ff_store: 1,
          // first need to flatten the array
          stores: {
            $reduce: {
              input: "$stores",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      // now count the unique values
      {
        $project: {
          id: 1,
          live: 1,
          types: 1,
          brands: 1,
          notLive: 1,
          subTypes: 1,
          products: 1,
          categories: 1,
          ff_mp: 1,
          ff_store: 1,
          stocks: { $round: ["$stocks", 2] },
          stores: { $size: { $setUnion: "$stores" } },
        },
      },
    ],
    {
      allowDiskUse: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: data[0],
  });
});

// market place analytics
exports.marketPlaceAnalytics = catchAsyncErrors(async (req, res, next) => {
  // set limit and skip to the request
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const data = await Product.aggregate([
    {
      $group: {
        _id: "$sku_marketplace",
        products: { $sum: 1 },
        live: { $sum: { $cond: ["$is_live", 1, 0] } },
        notLive: { $sum: { $cond: [{ $not: "$is_live" }, 1, 0] } },
        stocks: { $sum: "$estimated_SOH" },
        categories: {
          $addToSet: "$category_en",
        },
        types: {
          $addToSet: "$sku_type_en",
        },
        subTypes: {
          $addToSet: "$sku_sub_type_en",
        },
        brands: {
          $addToSet: "$brand_en",
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        live: "$live",
        stocks: "$stocks",
        notLive: "$notLive",
        products: "$products",
        types: { $size: "$types" },
        brands: { $size: "$brands" },
        subTypes: { $size: "$subTypes" },
        categories: { $size: "$categories" },
      },
    },
    {
      $sort: {
        live: -1,
      },
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "total" }],
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
                $group: {
                    _id: '$sku_marketplace',
                    products: { $sum: 1 },
                    live: { $sum: { $cond: ['$is_live', 1, 0] } },
                    notLive: { $sum: { $cond: [{ $not: '$is_live' }, 1, 0] } },
                    stocks: { $sum: '$estimated_SOH' },
                    categories: {
                        $addToSet: '$category_en',
                    },
                    types: {
                        $addToSet: '$sku_type_en',
                    },
                    subTypes: {
                        $addToSet: '$sku_sub_type_en',
                    },
                    brands: {
                        $addToSet: '$brand_en',
                    },
                },
            },
            {
                $project: {
                    _id: '$_id',
                    live: '$live',
                    stocks: '$stocks',
                    notLive: '$notLive',
                    products: '$products',
                    types: { $size: '$types' },
                    subTypes: { $size: '$subTypes' },
                    categories: { $size: '$categories' },
                    brands: { $size: '$brands' },
                },
            },

             {
            $project: {
                _id: 0,
                store_id: {
                    $map: {
                        input: '$stores',
                        as: 'store',
                        in: '$$store.store_id',
                    },
                },
                sku_marketplace: 1,
                sku_type_en: 1,
                sku_sub_type_en: 1,
                brand_en: 1,
                category_en: 1,
                is_live: 1,
                estimated_SOH: 1,
            },
        },
         // group by sku_marketplace
        {
            $group: {
                _id: '$sku_marketplace',
                products: { $sum: 1 },
                live: { $sum: { $cond: ['$is_live', 1, 0] } },
                notLive: { $sum: { $cond: [{ $not: '$is_live' }, 1, 0] } },
                stocks: { $sum: '$estimated_SOH' },
                categories: {
                    $addToSet: '$category_en',
                },
                types: {
                    $addToSet: '$sku_type_en',
                },
                subTypes: {
                    $addToSet: '$sku_sub_type_en',
                },
                brands: {
                    $addToSet: '$brand_en',
                },
                stores: {
                    $addToSet: '$stores',
                },
            },
        },
         {
            $project: {
                _id: 0,
                id: '$_id',
                live: '$live',
                stocks: '$stocks',
                notLive: '$notLive',
                products: '$products',
                types: { $size: '$types' },
                brands: { $size: '$brands' },
                subTypes: { $size: '$subTypes' },
                categories: { $size: '$categories' },
                // first need to flatten the array
                stores: {
                    $reduce: {
                        input: '$stores',
                        initialValue: [],
                        in: { $concatArrays: ['$$value', '$$this'] },
                    },
                },
            },
        },
*/
