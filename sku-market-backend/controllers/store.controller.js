const Store = require("../models/store.model");
const catchAsyncErrors = require("../lib/catchAsyncErrors");
const AppError = require("../util/appError");
const Product = require("../models/product.model");
const { default: mongoose } = require("mongoose");

exports.createStore = catchAsyncErrors(async (req, res, next) => {
  // check if the product exists

  const product = await Product.findById(req.body.product);
  if (!product) return next(new AppError("Product not found", 404));
  const store = await Store.create(req.body);

  res.status(201).json({
    status: "success",
    store,
  });
});

// updateStore
exports.updateStore = catchAsyncErrors(async (req, res, next) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      store,
    },
  });
});

// deleteStore
exports.deleteStore = catchAsyncErrors(async (req, res, next) => {
  await Store.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// find all stores buy product id
exports.findStoreByProductId = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const stores = await Store.aggregate([
    {
      $match: {
        product: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $project: {
        store_name: 1,
        store_offer_price: 1,
        store_rating: 1,
        store_offer_rank: 1,
        store_soh: 1,
        store_fulfilment_type: 1,
      },
    },
    {
      $facet: {
        data: [],
        total_soh: [
          {
            $group: {
              _id: null,
              total: {
                $sum: "$store_soh",
              },
            },
          },
        ],
      },
    },
    // now push total_soh to data
    {
      $project: {
        data: 1,
        total_soh: {
          $arrayElemAt: ["$total_soh.total", 0],
        },
      },
    },
    {
      $addFields: {
        data: {
          $map: {
            input: "$data",
            as: "item",
            in: {
              $mergeObjects: ["$$item", { total_soh: "$total_soh" }],
            },
          },
        },
      },
    },

    {
      $unwind: "$data",
    },
    {
      $addFields: {
        data: {
          $mergeObjects: [
            "$data",
            {
              store_cap: {
                $multiply: ["$data.store_soh", "$data.store_offer_price"],
              },
            },
          ],
        },
      },
    },
    {
      $sort: {
        "data.store_cap": -1,
      },
    },
    {
      $group: {
        _id: null,
        data: {
          $push: "$data",
        },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
      },
    },
    // add a new field to each document in the pipeline store_share_percent = store_soh / total_soh * 100
    {
      $addFields: {
        data: {
          $map: {
            input: "$data",
            as: "item",
            in: {
              $mergeObjects: [
                "$$item",
                {
                  store_share_percent: {
                    $multiply: [
                      {
                        $divide: ["$$item.store_soh", "$$item.total_soh"],
                      },
                      100,
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    // i need the first document data field only
    {
      $unwind: "$data",
    },
    {
      $group: {
        _id: null,
        data: {
          $push: "$data",
        },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
      },
    },
    {
      $unwind: "$data",
    },
    {
      $sort: {
        "data.store_share_percent": -1,
      },
    },

    // make data as new root
    {
      $replaceRoot: {
        newRoot: "$data",
      },
    },
    // make store_share_percent 2 decimal
    {
      $addFields: {
        store_share_percent: {
          $round: ["$store_share_percent", 2],
        },
      },
    },
    // add new field id remove total_soh and _id from data
    {
      $addFields: {
        id: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
        total_soh: 0,
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
    status: "success",
    total: stores?.[0]?.total?.[0]?.total || 0,
    result: stores[0].data.length,
    data: stores?.[0]?.data,
  });
});
