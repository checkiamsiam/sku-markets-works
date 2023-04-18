const catchAsyncErrors = require("../lib/catchAsyncErrors");
const Product = require("../models/product.model");
const AppError = require("../util/appError");
const Store = require("../models/store.model");

// create new product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    product,
  });
});

// get all products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  // 1B) Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (match) => `$${match}`
  );

  const sort = req.query.sort
    ? req.query.sort.split(",").join(" ")
    : "-createdAt";

  const fields = req.query.fields
    ? req.query.fields.split(",").join(" ")
    : "-__v";

  // wait for all the promises to be resolved
  const [products, count] = await Promise.all([
    Product.find(JSON.parse(queryStr))
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(fields)
      .allowDiskUse(true),

    Product.countDocuments(JSON.parse(queryStr)).allowDiskUse(true),
  ]);

  res.status(200).json({
    success: true,
    total: count,
    result: products.length,
    data: products,
  });
});

// get total products price_change,sku,sku_marketplace,sku_rank,current_price,price_change,dailyPrice,all_images
exports.getTotalProducts = catchAsyncErrors(async (req, res, next) => {
  let fields = req?.query?.fields;

  if (fields) {
    fields = fields.split(",").join(" ");
  } else {
    fields = "sku sku_marketplace title_en";
  }

  const total = await Product.countDocuments();
  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || total;
  skip = (page - 1) * limit;

  const totalProducts = await Product.find({})
    .skip(skip)
    .limit(limit)
    .select(fields)
    .allowDiskUse(true);

  res.status(200).json({
    status: "success",
    total,
    results: totalProducts.length,
    data: totalProducts,
  });
});

// get a single product
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // update the views of the product
  product.views = product.views + 1;

  await product.save();

  res.status(200).json({
    status: "success",
    product,
  });
});

// update a product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (req.body.stores && req.body.stores.length > 0) {
    // delete the stores of the product
    await Store.deleteMany({ product: req.params.id });

    const stores = req.body.stores.map((store) => {
      return {
        ...store,
        product: req.params.id,
      };
    });

    let store_id = await Store.create(stores);

    const storesIds = store_id.map((store) => store._id);

    product.stores = storesIds;
  }

  // if tags are sent in the request body then update the tags
  if (req.body.tags && req.body.tags.length > 0) {
    // if the tags are not an array then convert them to an array
    if (!Array.isArray(req.body.tags)) {
      req.body.tags = req.body.tags.split(",");
    } else {
      req.body.tags = req.body.tags;
    }
  }

  // if category_live_sku is sent in the request body then update the category_live_sku
  if (req.body.category_live_sku) {
    product.category_live_sku = req.body.category_live_sku;
  }

  // if is_live is sent in the request body then update the is_live
  if (req.body.is_live) {
    product.is_live = req.body.is_live;
  }

  // if sku_rate is sent in the request body then update the sku_rate
  if (req.body.sku_rate) {
    product.sku_rate = req.body.sku_rate;
  }

  // if sku_rank is sent in the request body then update the sku_rank
  if (req.body.sku_rank) {
    product.sku_rank = req.body.sku_rank;
  }

  // if sku_marketplace is sent in the request body then update the sku_marketplace
  if (req.body.sku_marketplace) {
    product.sku_marketplace = req.body.sku_marketplace;
  }

  // if buy_box_currency is sent in the request body then update the buy_box_currency
  if (req.body.buy_box_currency) {
    product.buy_box_currency = req.body.buy_box_currency;
  }

  // if number_of_sellers is sent in the request body then update the number_of_sellers
  if (req.body.number_of_sellers) {
    product.number_of_sellers = req.body.number_of_sellers;
  }

  // if buy_box_sku_fulfillment_type is sent in the request body then update the buy_box_sku_fulfillment_type
  if (req.body.buy_box_sku_fulfillment_type) {
    product.buy_box_sku_fulfillment_type =
      req.body.buy_box_sku_fulfillment_type;
  }

  // if total_stock is sent in the request body then update the total_stock
  if (req.body.total_stock) {
    product.total_stock = req.body.total_stock;
  }

  await product.save();

  res.status(200).json({
    status: "success",
    product,
  });
});

// delete a product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(202).json({
    status: "success",
    data: null,
  });
});

// sell  products
exports.sellProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.stock = product.stock - req.body.quantity;

  await product.save();

  res.status(200).json({
    status: "success",
    product,
  });
});

// search products by title and sku
exports.searchProducts = catchAsyncErrors(async (req, res, next) => {
  let fields = req?.query?.fields;

  if (fields) {
    fields = fields.split(",").join(" ");
  } else {
    fields = "sku sku_marketplace title_en";
  }

  const products = await Product.find({
    $or: [
      { title_en: { $regex: req.query.search, $options: "i" } },
      { sku: { $regex: req.query.search, $options: "i" } },
    ],
  })
    .select(fields)
    .allowDiskUse(true);

  res.status(200).json({
    status: "success",
    data: products,
  });
});

// search products by title and sku and give the result in pages
exports.searchProductsPaginate = catchAsyncErrors(async (req, res, next) => {
  let fields = req?.query?.fields;
  let limit = req?.query?.limit || 10;
  let page = req?.query?.page || 1;
  const skip = (page - 1) * limit;

  if (fields) {
    fields = fields.split(",").join(" ");
  } else {
    fields = "sku sku_marketplace title_en";
  }

  // end point for search products /api/v1/products/search?search=iphone&fields=sku,title_en&limit=10&page=1

  const products = await Product.find({
    $or: [{ sku: { $regex: req.query.search, $options: "i" } }],
  })
    .select(fields)
    .skip(skip)
    .limit(limit)
    .allowDiskUse(true);

  res.status(200).json({
    status: "success",
    data: products,
  });
});

// find how many unique brand_en are there in the database
exports.getUniqueBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await Product.distinct("brand_en");

  res.status(200).json({
    status: "success",
    data: brands,
  });
});

// find how many unique category_en are there in the database
exports.getUniqueCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Product.distinct("category_en");

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

// find how many unique tags are there in the database
exports.getUniqueTags = catchAsyncErrors(async (req, res, next) => {
  const tags = await Product.distinct("tags");

  res.status(200).json({
    status: "success",
    data: tags,
  });
});

// count document how many products are  there with a specific brand_en
exports.countProductsByBrand = catchAsyncErrors(async (req, res, next) => {
  const count = await Product.countDocuments({
    brand_en: req.params.brand,
  });

  res.status(200).json({
    status: "success",
    data: count,
  });
});

// count document how many products are  there with a specific category_en
exports.countProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const count = await Product.countDocuments({
    category_en: req.params.category,
  });

  res.status(200).json({
    status: "success",
    data: count,
  });
});

exports.brandAnalytics = catchAsyncErrors(async (req, res, next) => {
  const brandAnalytics = await Product.aggregate([
    {
      $match: {
        brand_en: req.params.brand,
      },
    },
    {
      $group: {
        _id: "$brand_en",
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
        express: {
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
        stores: {
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
    {
      $group: {
        _id: "$_id",
        live: { $sum: "$live" },
        stocks: { $sum: "$stocks" },
        stores: { $sum: "$stores" },
        notLive: { $sum: "$notLive" },
        products: { $sum: "$products" },
        express: { $sum: "$express" },
        products: { $sum: "$products" },
        types: { $sum: { $size: "$types" } },
        subTypes: { $sum: { $size: "$subTypes" } },
        categories: { $sum: { $size: "$categories" } },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: brandAnalytics[0] || {},
  });
});

// product summary
exports.productSummary = catchAsyncErrors(async (req, res, next) => {
  const productSummary = await Product.aggregate([
    {
      $group: {
        _id: null,
        live: { $sum: { $cond: ["$is_live", 1, 0] } },
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
        noon_uae: {
          $sum: {
            $cond: [
              {
                $eq: ["$sku_marketplace", "noon/uae"],
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
                $eq: ["$sku_marketplace", "noon/egypt"],
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
                $eq: ["$sku_marketplace", "noon/ksa"],
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
                $eq: ["$sku_marketplace", "amazon/uae"],
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
                $eq: ["$sku_marketplace", "amazon/egypt"],
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
                $eq: ["$sku_marketplace", "amazon/ksa"],
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
        live: 1,
        ff_mp: 1,
        ff_store: 1,
        noon_uae: 1,
        noon_egypt: 1,
        noon_ksa: 1,
        amazon_uae: 1,
        amazon_egypt: 1,
        amazon_ksa: 1,
        // win_marketplace: {
        //     $max: [
        //         '$noon_uae',
        //         '$noon_egypt',
        //         '$noon_ksa',
        //         '$amazon_uae',
        //         '$amazon_egypt',
        //         '$amazon_ksa',
        //     ],
        // },
      },
    },
  ]);

  const marketplaces = {
    noon_uae: productSummary[0].noon_uae,
    noon_egypt: productSummary[0].noon_egypt,
    noon_ksa: productSummary[0].noon_ksa,
    amazon_uae: productSummary[0].amazon_uae,
    amazon_egypt: productSummary[0].amazon_egypt,
    amazon_ksa: productSummary[0].amazon_ksa,
  };

  const marketplace = Object.keys(marketplaces).reduce((a, b) =>
    marketplaces[a] > marketplaces[b] ? a : b
  );

  productSummary[0].marketplace = marketplace.split("_").join("/");

  // delete marketplaces from productSummary
  delete productSummary[0].noon_uae;
  delete productSummary[0].noon_egypt;
  delete productSummary[0].noon_ksa;
  delete productSummary[0].amazon_uae;
  delete productSummary[0].amazon_egypt;
  delete productSummary[0].amazon_ksa;

  res.status(200).json({
    status: "success",
    data: productSummary[0] || {},
  });
});

// get product image using sku
exports.getProductImage = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.aggregate([
    {
      $match: {
        sku: req.params.sku,
      },
    },
    {
      $project: {
        _id: 0,
        all_images: 1,
      },
    },
    {
      $unwind: "$all_images",
    },
    {
      $group: {
        _id: null,
        all_images: { $addToSet: "$all_images" },
      },
    },
    {
      $project: {
        _id: 0,
        all_images: 1,
      },
    },
  ]);

  const data = {
    sku: req.params.sku,
    all_images: product?.[0]?.all_images || [],
  };

  res.status(200).json({
    status: "success",
    data,
  });
});

// find all the products with the same sku and update there images
exports.updateProductImages = catchAsyncErrors(async (req, res, next) => {
  const sku = req.params.sku;
  const all_images = req.body.all_images;

  const products = await Product.updateMany(
    { sku },
    {
      $set: {
        all_images,
      },
    }
  );

  res.status(200).json({
    status: "success",
    data: products,
  });
});
