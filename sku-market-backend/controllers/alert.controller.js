// create or update an alert
const catchAsyncErrors = require("../lib/catchAsyncErrors");
const Alert = require("../models/alert.model");
const Product = require("../models/product.model");
const { deleteOne } = require("../util/factory");
const AppError = require("../util/appError");

exports.Alert = catchAsyncErrors(async (req, res, next) => {
  // find alert by user  if alert exists, update alert else create alert
  let alert = await Alert.findOne({
    user: req.user._id,
    product: req.body.product,
  });

  if (!alert) {
    // find product by id and select the sku, is_live, estimated_SOH, current_price, number_of_sellers, buy_box_sku_fulfillment_type
    const product = await Product.findById(req.body.product).select(
      "sku is_live estimated_SOH current_price number_of_sellers buy_box_sku_fulfillment_type"
    );

    // create alert
    alert = await Alert.create({
      user: req.user._id,
      sku: product.sku,
      is_live: product.is_live,
      stock: product.estimated_SOH,
      price: product.current_price,
      store: product.number_of_sellers,
      fulfillment_type: product.buy_box_sku_fulfillment_type,

      product: req.body.product,
      price_range: req.body.price_range,
      stock_range: req.body.stock_range,
      store_range: req.body.store_range,
      alert_is_live: req.body.alert_is_live,
      price_move_below: req.body.price_move_below,
      price_move_above: req.body.price_move_above,
      stock_move_below: req.body.stock_move_below,
      stock_move_above: req.body.stock_move_above,
      store_move_below: req.body.store_move_below,
      store_move_above: req.body.store_move_above,
      alert_fulfillment_type: req.body.alert_fulfillment_type,
    });
  } else {
    // update alert

    alert.active = req.body.active;
    alert.alert_is_live = req.body.alert_is_live;

    if (req.body.price_move_above) {
      alert.price_move_above = req.body.price_move_above;
    }

    if (req.body.price_move_below) {
      alert.price_move_below = req.body.price_move_below;
    }

    if (req.body.stock_move_above) {
      alert.stock_move_above = req.body.stock_move_above;
    }

    if (req.body.stock_move_below) {
      alert.stock_move_below = req.body.stock_move_below;
    }

    if (req.body.store_move_above) {
      alert.store_move_above = req.body.store_move_above;
    }

    if (req.body.store_move_below) {
      alert.store_move_below = req.body.store_move_below;
    }

    if (req.body.price_range) {
      alert.price_range = req.body.price_range;
    }

    if (req.body.stock_range) {
      alert.stock_range = req.body.stock_range;
    }

    if (req.body.store_range) {
      alert.store_range = req.body.store_range;
    }

    if (req.body.alert_fulfillment_type) {
      alert.alert_fulfillment_type = req.body.alert_fulfillment_type;
    }

    await alert.save();
  }

  res.status(200).json({
    success: true,
    alert,
  });
});

// delete an alert
exports.deleteAlert = deleteOne(Alert);

// get all alerts for a user
exports.getAlerts = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const data = await Alert.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    // push fields from product
    {
      $addFields: {
        id: "$product._id",
        _id: "$product._id",
        alert_id: "$_id",
        sku_rate: "$product.sku_rate",
        sku_rank: "$product.sku_rank",
        all_images: "$product.all_images",
        brand_en: "$product.brand_en",
        category_en: "$product.category_en",
        sku_marketplace: "$product.sku_marketplace",
      },
    },
    // remove fields from product
    {
      $project: {
        product: 0,
        user: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
    // keep only first element of all_images array
    {
      $addFields: {
        all_images: {
          $slice: ["$all_images", 1],
        },
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

// create many alerts
exports.createManyAlerts = catchAsyncErrors(async (req, res, next) => {
  // check if  req.body is an array
  if (!Array.isArray(req.body)) {
    return next(
      new AppError("Invalid request body. Request body should be an array", 400)
    );
  }

  // check if req.body is empty
  if (req.body.length === 0) {
    return next(new AppError("Request body is empty", 400));
  }

  // check if req.body is an array of objects
  if (!req.body.every((item) => typeof item === "object")) {
    return next(
      new AppError(
        "Invalid request body. Request body should be an array of objects",
        400
      )
    );
  }

  // console.log(req.body);

  // remove duplicates sku objects
  req.body = await req.body.filter(
    (item, index, self) => index === self.findIndex((t) => t.sku === item.sku)
  );

  /* 
    loop over the array and  find the product by sku
    and add the product id is_live estimated_SOH current_price number_of_sellers buy_box_sku_fulfillment_type to the object
    */

  for (let i = 0; i < req.body.length; i++) {
    const product = await Product.findOne({
      sku: req.body[i].sku,
    }).select(
      "sku is_live estimated_SOH current_price number_of_sellers buy_box_sku_fulfillment_type"
    );

    if (!product) {
      return next(
        new AppError(`Product with sku ${req.body[i].sku} does not exist`, 404)
      );
    }

    req.body[i].user = req.user._id;
    req.body[i].product = product._id;
    req.body[i].is_live = product.is_live;
    req.body[i].stock = product.estimated_SOH;
    req.body[i].price = product.current_price;
    req.body[i].store = product.number_of_sellers;
    req.body[i].fulfillment_type = product.buy_box_sku_fulfillment_type;
  }

  // insert many alerts
  const alerts = await Alert.insertMany(req.body);

  res.status(200).json({
    success: true,
    alerts,
  });
});

/* 
 {
            $addFields: {
                price_range: {
                    $cond: {
                        if: {
                            $or: [
                                {
                                    $gt: ["$price_range.top", 0],
                                },
                                {
                                    $gt: ["$price_range.bottom", 0],
                                },
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
                stock_range: {
                    $cond: {
                        if: {
                            $or: [
                                {
                                    $gt: ["$stock_range.top", 0],
                                },
                                {
                                    $gt: ["$stock_range.bottom", 0],
                                },
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
                store_range: {
                    $cond: {
                        if: {
                            $or: [
                                {
                                    $gt: ["$store_range.top", 0],
                                },
                                {
                                    $gt: ["$store_range.bottom", 0],
                                },
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
                price_move_below: {
                    $cond: {
                        if: {
                            $gt: ["$price_move_below", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
                price_move_above: {
                    $cond: {
                        if: {
                            $gt: ["$price_move_above", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
                stock_move_below: {
                    $cond: {
                        if: {
                            $gt: ["$stock_move_below", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
                stock_move_above: {
                    $cond: {
                        if: {
                            $gt: ["$stock_move_above", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
                store_move_below: {
                    $cond: {
                        if: {
                            $gt: ["$store_move_below", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
                store_move_above: {
                    $cond: {
                        if: {
                            $gt: ["$store_move_above", 0],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
*/
