const catchAsyncErrors = require("../lib/catchAsyncErrors");
const WatchList = require("../models/watchList.model");
const Product = require("../models/product.model");
const AppError = require("../util/appError");
const { default: mongoose } = require("mongoose");

// create new watchList
exports.createWatchList = catchAsyncErrors(async (req, res, next) => {
  // if product is in the body, check if it exists
  if (req.body.product) {
    const product = await Product.findById(req.body.product);
    if (!product) return next(new AppError("Product not found", 404));

    const result = await WatchList.create({
      name: req.body.name,
      user: req.user.id,
      product: req.body.product,
    });

    return res.status(201).json({
      success: true,
      watchList: result,
    });
  }

  const result = await WatchList.create({
    name: req.body.name,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    watchList: result,
  });
});

// get by id and push product
exports.pushProduct = catchAsyncErrors(async (req, res, next) => {
  const watchList = await WatchList.findById(req.params.id);

  if (!watchList) return next(new AppError("WatchList not found", 404));

  const product = await Product.findById(req.params.product);

  if (!product) return next(new AppError("Product not found", 404));

  if (watchList.product.includes(req.params.product)) {
    return next(new AppError("Product already added to watchList", 400));
  }

  watchList.product.push(req.params.product);

  await watchList.save();

  res.status(200).json({
    success: true,
    watchList,
  });
});

// delete product from watchList
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const watchList = await WatchList.findById(req.params.id);

  if (!watchList) return next(new AppError("WatchList not found", 404));

  if (!watchList.product.includes(req.params.product)) {
    return next(new AppError("Product not in watchList", 400));
  }

  watchList.product.pull(req.params.product);

  await watchList.save();

  res.status(200).json({
    success: true,
    watchList,
  });
});

// delete watchList
exports.deleteWatchList = catchAsyncErrors(async (req, res, next) => {
  const watchList = await WatchList.findById(req.params.id);

  if (!watchList) {
    return next(new AppError("WatchList not found", 404));
  }

  await watchList.remove();

  res.status(200).json({
    success: true,
    message: "WatchList deleted",
  });
});

// get all watchLists of a user populated with products
exports.getWatchLists = catchAsyncErrors(async (req, res, next) => {
  const data = await WatchList.find({ user: req.user.id }).select("name");

  res.status(200).json({
    success: true,
    data,
  });
});

// get single watchList of a user populated with products
exports.getWatchList = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const query = req.query;
  const newQuery = { ...query };

  const excludedFields = ["page", "sort", "limit", "fields"];

  excludedFields.forEach((el) => delete newQuery[el]);

  // replace gte|gt|lte|lt with $gte|$gt|$lte|$lt
  let queryStr = JSON.stringify(newQuery);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // convert queryStr valid javascript object
  const queryObj = JSON.parse(queryStr);
  // remove quotes from  numbers and booleans
  Object.keys(queryObj).forEach((key) => {
    if (queryObj[key] === "true") {
      queryObj[key] = true;
    } else if (queryObj[key] === "false") {
      queryObj[key] = false;
    } else if (!isNaN(queryObj[key])) {
      queryObj[key] = parseInt(queryObj[key]);
    }

    // if key is { '$gt': '10' } then convert it to { '$gt': 10 }
    if (typeof queryObj[key] === "object") {
      Object.keys(queryObj[key]).forEach((el) => {
        if (!isNaN(queryObj[key][el])) {
          queryObj[key][el] = parseInt(queryObj[key][el]);
        }
      });
    }
  });

  // sort by
  let sort = req.query.sort || "createdAt";
  sort = sort.split(",").join(" ");

  // create sort object
  const sortObj = {};
  sort.split(" ").forEach((el) => {
    if (el.startsWith("-")) {
      sortObj[el.slice(1)] = -1;
    } else {
      sortObj[el] = 1;
    }
  });

  // select fields
  let fields = req.query.fields || "sku";
  fields = fields.split(",").join(" ");

  // create fields object
  const fieldsObj = {};
  fields.split(" ").forEach((el) => {
    fieldsObj[el] = 1;
  });

  const id = req.params.id;

  const data = await WatchList.aggregate([
    // match watchList
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    // lookup products
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    // unwind products
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // push watchList _id to product as watchList_id
    {
      $addFields: {
        "product.watchList_id": "$_id",
      },
    },
    // unwrap product
    {
      $replaceRoot: {
        newRoot: "$product",
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
        id: "$_id",
      },
    },
    // remove _id field
    {
      $project: {
        _id: 0,
      },
    },
    // add a new field to the root as the count of the  total documents
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "total" }],
      },
    },
  ]);

  // check if data[0].data[0] as no id field set data[0].data to empty array also  data[0].total[0] is 0 also set data[0].length to 0
  if (!data[0].data[0]?.id) {
    data[0].data = [];
    data[0].total[0].total = 0;
    data[0].result = 0;
  }

  res.status(200).json({
    success: true,
    total: data[0].total?.[0]?.total || 0,
    result: data[0].data.length,
    data: data[0].data,
  });
});

// update watchList name
exports.updateWatchList = catchAsyncErrors(async (req, res, next) => {
  const watchList = await WatchList.findById(req.params.id);

  if (!watchList) {
    return next(new AppError("WatchList not found", 404));
  }

  watchList.name = req.body.name;

  await watchList.save();

  res.status(200).json({
    success: true,
    watchList,
  });
});

/* 

 if (Object.keys(data[0].data[0]).length === 0) {
        data[0].data = [];
        data[0].total[0].total = 0;
        data[0].length = 0;
    }
    
*/
