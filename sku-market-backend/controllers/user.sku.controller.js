const catchAsyncErrors = require("../lib/catchAsyncErrors");
const AppError = require("../util/appError");
const userSku = require("../models/user.sku.model");
const watchList = require("../models/watchList.model");
const Alert = require("../models/alert.model");
const { ObjectId } = require("mongodb");

// create a requestProduct
exports.createOrUpdate = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const user = req.user._id;

  // // check if data is an array
  if (!Array.isArray(data)) return next(new AppError("data must be an array"));

  // // check if data is empty
  if (data.length === 0) return next(new AppError("data must not be empty"));

  // add user to each item
  for (const item of data) {
    item.user = user;
  }

  // find many and update
  await userSku.bulkWrite(
    data.map((item) => ({
      updateOne: {
        filter: {
          user,
          sku: item.sku,
          sku_marketplace: item.sku_marketplace,
        },
        update: item,
        upsert: true,
      },
    }))
  );

  res.status(204).send();
});

// delete  requestProducts
exports.deleteSku = catchAsyncErrors(async (req, res, next) => {
  // await RequestProduct.findOneAndUpdate(
  //     { user },
  //     { $pull: { sku: { $in: sku } } },
  //     { new: true }
  // );

  // find by id and delete
  await userSku.findByIdAndDelete(req.params.id);

  res.status(204).send();
});

// get those requestProducts that have no product
exports.getEmptySku = catchAsyncErrors(async (req, res, next) => {
  const data = await userSku.aggregate([
    // populate the product find by sku and marketplace
    {
      $lookup: {
        from: "products",
        let: {
          sku: "$sku",
          sku_marketplace: "$sku_marketplace",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$sku", "$$sku"] },
                  {
                    $eq: ["$sku_marketplace", "$$sku_marketplace"],
                  },
                ],
              },
            },
          },
        ],
        as: "product",
      },
    },
    // kept only those that have no product
    {
      $match: {
        product: { $size: 0 },
      },
    },

    // keep only the sku and marketplace
    {
      $project: {
        sku: 1,
        sku_marketplace: 1,
        _id: 0,
      },
    },
    {
      $facet: {
        data: [],
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

// new way to get the requestProducts
exports.getUserSku = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;

  // get the requestProducts
  const data = await userSku.aggregate([
    { $match: { user } },
    // populate the product find by sku and marketplace
    {
      $lookup: {
        from: "products",
        let: {
          sku: "$sku",
          sku_marketplace: "$sku_marketplace",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$sku", "$$sku"] },
                  {
                    $eq: ["$sku_marketplace", "$$sku_marketplace"],
                  },
                ],
              },
            },
          },
        ],
        as: "product",
      },
    },
    // remove those that have no product
    {
      $match: {
        product: { $ne: [] },
      },
    },
    // add store_id to the product
    {
      $addFields: {
        "product.store_id": "$store_id",
      },
    },
    // unwind the product array
    {
      $unwind: "$product",
    },
    // add the product to the root
    {
      $replaceRoot: {
        newRoot: "$product",
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
    // add new id field
    {
      $addFields: {
        id: "$_id",
      },
    },
    // use the req.pipeline
    ...req.pipeline,
  ]);

  res.status(200).json({
    success: true,
    total: data[0].total?.[0]?.total || 0,
    result: data[0].data.length,
    data: data[0].data,
  });
});

//top brands
exports.getTopBrandsOrCategory = catchAsyncErrors(async (req, res, next) => {
  const filter = req.query.filter || "brand_en";
  const user = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const data = await userSku.aggregate([
    { $match: { user } },
    // populate the product find by sku and marketplace
    {
      $lookup: {
        from: "products",
        let: {
          sku: "$sku",
          sku_marketplace: "$sku_marketplace",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$sku", "$$sku"] },
                  {
                    $eq: ["$sku_marketplace", "$$sku_marketplace"],
                  },
                ],
              },
            },
          },
        ],
        as: "product",
      },
    },
    // remove those that have no product
    {
      $match: {
        product: { $ne: [] },
      },
    },
    // unwind the product array
    {
      $unwind: "$product",
    },
    // add the product to the root
    {
      $replaceRoot: {
        newRoot: "$product",
      },
    },
    // add new id field
    {
      $addFields: {
        id: "$_id",
      },
    },
    //  group by brand
    {
      $group: {
        _id: `$${filter}`,
        sku: { $sum: 1 },
        marketplace: {
          $push: "$sku_marketplace",
        },
        sku_rate: { $sum: "$sku_rate" },
        brand: { $addToSet: "$brand_en" },
        category: { $addToSet: "$category_en" },
        type: { $addToSet: "$sku_type_en" },
        sub_type: { $addToSet: "$sku_sub_type_en" },
        soh: { $sum: "$estimated_SOH" },
        stores: {
          $sum: {
            $size: {
              $ifNull: ["$stores", []],
            },
          },
        },
        is_live: {
          $sum: {
            $cond: [{ $eq: ["$is_live", true] }, 1, 0],
          },
        },
        is_not_live: {
          $sum: {
            $cond: [{ $eq: ["$is_live", false] }, 1, 0],
          },
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
    // get the top marketplace
    {
      $addFields: {
        marketplace: {
          $arrayElemAt: [
            "$marketplace",
            {
              $indexOfArray: [
                "$marketplace",
                {
                  $max: "$marketplace",
                },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        sku: 1,
        category: { $size: "$category" },
        brand: { $size: "$brand" },
        type: { $size: "$type" },
        sub_type: { $size: "$sub_type" },
        soh: 1,
        stores: 1,
        is_live: 1,
        is_not_live: 1,
        ff_mp: 1,
        ff_store: 1,
        marketplace: 1,
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

//store competitors
exports.getStoreCompetitors = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const store_id = req.query.store_id || "37245";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const data = await userSku.aggregate([
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
        path: "$sku",
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup the product
    {
      $lookup: {
        from: "products",
        localField: "sku",
        foreignField: "sku",
        as: "product",
      },
    },
    // unwind the product
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "product._id": {
          $ne: null,
        },
      },
    },
    // unwrap the product
    {
      $replaceRoot: {
        newRoot: "$product",
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
        path: "$stores",
        preserveNullAndEmptyArrays: true,
      },
    },
    // populate the stores field
    {
      $lookup: {
        from: "stores",
        localField: "stores",
        foreignField: "_id",
        as: "store",
      },
    },
    // unwind the store field
    {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "store._id": {
          $ne: null,
        },
      },
    },
    // unwrap the store
    {
      $replaceRoot: {
        newRoot: "$store",
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
    // group by store_id
    {
      $group: {
        _id: "$store_id",
        store_name: {
          $first: "$store_name",
        },
        product: {
          $sum: 1,
        },
        store_offer_price: {
          $avg: "$store_offer_price",
        },
        store_rating: {
          $first: "$store_rating",
        },
        store_soh: {
          $sum: "$store_soh",
        },
        id: {
          $first: "$store_id",
        },
      },
    },

    // add new fields
    {
      $addFields: {
        estimated_value: {
          $multiply: ["$store_soh", "$store_offer_price"],
        },
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

  if (data[0].data.length > 0) {
    data[0].data.forEach((doc) => {
      const total = data?.[0]?.total?.[0]?.total || 0;
      const percentage = (doc.product / total) * 100;
      doc.percentage = percentage.toFixed(2);
    });
  }

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

  const data = await userSku.aggregate([
    { $match: { user } },
    // populate the product find by sku and marketplace
    {
      $lookup: {
        from: "products",
        let: {
          sku: "$sku",
          sku_marketplace: "$sku_marketplace",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$sku", "$$sku"] },
                  {
                    $eq: ["$sku_marketplace", "$$sku_marketplace"],
                  },
                ],
              },
            },
          },
        ],
        as: "product",
      },
    },
    // remove those that have no product
    {
      $match: {
        product: { $ne: [] },
      },
    },
    // unwind the product
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "product._id": {
          $ne: null,
        },
      },
    },
    // add store_id to the product
    {
      $addFields: {
        "product.my_store_id": "$store_id",
      },
    },
    // unwrap the product
    {
      $replaceRoot: {
        newRoot: "$product",
      },
    },
    // // keep only stores field
    // {
    //   $project: {
    //     stores: 1,
    //     my_store_id: 1,
    //   },
    // },
    // unwind the stores field
    {
      $unwind: {
        path: "$stores",
        preserveNullAndEmptyArrays: true,
      },
    },
    // populate the stores field
    {
      $lookup: {
        from: "stores",
        localField: "stores",
        foreignField: "_id",
        as: "store",
      },
    },
    // unwind the store field
    {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "store._id": {
          $ne: null,
        },
      },
    },
    // add my_store_id to the store
    {
      $addFields: {
        "store.my_store_id": "$my_store_id",
      },
    },
    // unwrap the store
    {
      $replaceRoot: {
        newRoot: "$store",
      },
    },
    // make my_store_id string to compare with store_id
    {
      $addFields: {
        my_store_id: {
          $toString: "$my_store_id",
        },
      },
    },
    // keep only those whose store_offer_rank is not 1
    {
      $match: {
        store_offer_rank: {
          $ne: 1,
        },
        $expr: {
          $eq: ["$my_store_id", "$store_id"],
        },
      },
    },
    // populate the store with the product
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    // unwind the product
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "product._id": {
          $ne: null,
        },
      },
    },
    // unwrap the product
    {
      $replaceRoot: {
        newRoot: "$product",
      },
    },

    // add new fields
    {
      $addFields: {
        id: "$_id",
      },
    },
    // use the req.pipeline
    ...req.pipeline,
  ]);

  res.status(200).json({
    success: true,
    total: data[0].total?.[0]?.total || 0,
    result: data[0].data.length,
    data: data[0].data,
  });
});
exports.isSkuWatchListed = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const productId = req.params.productId;
  const watchLists = await watchList.find({
    user,
    product: { $in: productId },
  });
  res.status(200).json({
    success: true,
    data: watchLists,
  });
});

exports.isAlertedProduct = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const productId = req.params.productId;
  console.log(productId);
  const data = await Alert.aggregate([
    {
      $match: {
        user,
        product: new ObjectId(productId)
      },
    },
  ]);
  res.status(200).json({
    success: true,
    data ,
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

// remove the null values
// {
//     $match: {
//         "product._id": {
//             $ne: null,
//         },
//     },
// },

/* 
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
        path: "$sku",
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup the product
    {
      $lookup: {
        from: "products",
        localField: "sku",
        foreignField: "sku",
        as: "product",
      },
    },
    // unwind the product
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "product._id": {
          $ne: null,
        },
      },
    },
    // unwrap the product
    {
      $replaceRoot: {
        newRoot: "$product",
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
        path: "$stores",
        preserveNullAndEmptyArrays: true,
      },
    },
    // populate the stores field
    {
      $lookup: {
        from: "stores",
        localField: "stores",
        foreignField: "_id",
        as: "store",
      },
    },
    // unwind the store field
    {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "store._id": {
          $ne: null,
        },
      },
    },
    // unwrap the store
    {
      $replaceRoot: {
        newRoot: "$store",
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
        _id: "$store_name",
        soh: { $sum: "$store_soh" },
        skus: { $sum: 1 },
        rating: { $avg: "$store_rating" },
      },
    },
    // add id field remove _id field
    {
      $addFields: {
        id: "$_id",
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
        total: [{ $count: "total" }],
      },
    },
  ]);
*/

/* 
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
        path: "$sku",
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup the product
    {
      $lookup: {
        from: "products",
        localField: "sku",
        foreignField: "sku",
        as: "product",
      },
    },
    // unwind the product
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    // remove the null values
    {
      $match: {
        "product._id": {
          $ne: null,
        },
      },
    },
    // unwrap the product
    {
      $replaceRoot: {
        newRoot: "$product",
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
        path: "$stores",
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
        max_price: "$getTopBottomPrice.topPrice.last30Days",
        min_price: "$getTopBottomPrice.bottomPrice.last30Days",
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
        from: "stores",
        localField: "stores",
        foreignField: "_id",
        as: "store",
      },
    },
    // unwind the store field
    {
      $unwind: {
        path: "$store",
        preserveNullAndEmptyArrays: true,
      },
    },
    // keep only those documents that store_id is equal to the store_id and store_offer_rank is greater than 1
    {
      $match: {
        "store.store_id": store_id,
        "store.store_offer_rank": { $gt: 1 },
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
        _id: "$_id",
        sku: { $first: "$sku" },
        category_en: { $first: "$category_en" },
        current_price: { $first: "$current_price" },
        brand_en: { $first: "$brand_en" },
        price_change: { $first: "$price_change" },
        max_price: { $first: "$max_price" },
        min_price: { $first: "$min_price" },
        all_images: { $first: "$all_images" },
        sku_marketplace: { $first: "$sku_marketplace" },
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
*/

/*
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
              path: "$sku",
              preserveNullAndEmptyArrays: true,
          },
      },
      // lookup the product
      {
          $lookup: {
              from: "products",
              localField: "sku",
              foreignField: "sku",
              as: "product",
          },
      },
      // unwind the product
      {
          $unwind: {
              path: "$product",
              preserveNullAndEmptyArrays: true,
          },
      },
      // remove the null values
      {
          $match: {
              "product._id": {
                  $ne: null,
              },
          },
      },
      // unwrap the product
      {
          $replaceRoot: {
              newRoot: "$product",
          },
      },
      // group by brand
      {
          $group: {
              _id: `$${filter}`,
              sku: { $sum: 1 },
              marketplace: {
                  $push: "$sku_marketplace",
              },
              sku_rate: { $sum: "$sku_rate" },
              brand: { $addToSet: "$brand_en" },
              category: { $addToSet: "$category_en" },
              type: { $addToSet: "$sku_type_en" },
              sub_type: { $addToSet: "$sku_sub_type_en" },
              soh: { $sum: "$estimated_SOH" },
              stores: {
                  $sum: {
                      $size: {
                          $ifNull: ["$stores", []],
                      },
                  },
              },
              is_live: {
                  $sum: {
                      $cond: [{ $eq: ["$is_live", true] }, 1, 0],
                  },
              },
              is_not_live: {
                  $sum: {
                      $cond: [{ $eq: ["$is_live", false] }, 1, 0],
                  },
              },
              ff_mp: {
                  $sum: {
                      $cond: [
                          {
                              $eq: [
                                  "$buy_box_sku_fulfillment_type",
                                  "Fulfilled by MP",
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
                                  "$buy_box_sku_fulfillment_type",
                                  "Fulfilled by Stores",
                              ],
                          },
                          1,
                          0,
                      ],
                  },
              },
          },
      },
      // get the top marketplace
      {
          $addFields: {
              marketplace: {
                  $arrayElemAt: [
                      "$marketplace",
                      {
                          $indexOfArray: [
                              "$marketplace",
                              {
                                  $max: "$marketplace",
                              },
                          ],
                      },
                  ],
              },
          },
      },
      {
          $project: {
              _id: 0,
              id: "$_id",
              sku: 1,
              category: { $size: "$category" },
              brand: { $size: "$brand" },
              type: { $size: "$type" },
              sub_type: { $size: "$sub_type" },
              soh: 1,
              stores: 1,
              is_live: 1,
              is_not_live: 1,
              ff_mp: 1,
              ff_store: 1,
              marketplace: 1,
          },
      },
      // add a new field to the root as the count of the  total documents
      {
          $facet: {
              data: [{ $skip: skip }, { $limit: limit }],
              total: [{ $count: "total" }],
          },
      },
  ]); */
