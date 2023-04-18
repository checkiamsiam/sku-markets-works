const catchAsyncErrors = require("../lib/catchAsyncErrors");
const AppError = require("../util/appError");
const Portfolio = require("../models/portfolio.model");
const mongoose = require("mongoose");

exports.createPortfolio = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user._id;

    // check how many portfolios user has
    const portfolios = await Portfolio.countDocuments({
        user: req.user._id,
    });

    if (portfolios >= 5) {
        return next(
            new AppError(
                "You can only have 5 portfolios. Delete one to add a new one.",
                400
            )
        );
    }

    Portfolio.create(req.body)
        .then((portfolio) => {
            res.status(201).json({
                status: "success",
                data: portfolio,
            });
        })
        .catch((err) => {
            // duplicate key error
            if (err.code === 11000) {
                err.message = "Portfolio already exists";
                next(new AppError(err.message, 400));
            } else {
                next(new AppError(err.message, 400));
            }
        });
});

exports.getPortfolios = catchAsyncErrors(async (req, res) => {
    const user = req.user._id;
    const portfolios = await Portfolio.find({ user });
    res.status(200).json({
        status: "success",
        data: portfolios,
    });
});

exports.deletePortfolio = catchAsyncErrors(async (req, res) => {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.deleteAllPortfolio = catchAsyncErrors(async (req, res) => {
    await Portfolio.deleteMany({ user: req.user._id });
    res.status(204).json({
        status: true,
        data: null,
    });
});

exports.addProductToPortfolio = catchAsyncErrors(async (req, res, next) => {
    const product = req.body;

    const portfolio = await Portfolio.findOne({
        store_id: product.store_id,
        user: req.user._id,
    });

    if (!portfolio) {
        // check how many portfolios user has
        const portfolios = await Portfolio.countDocuments({
            user: req.user._id,
        });

        if (portfolios >= 5) {
            return next(
                new AppError(
                    "You can only have 5 portfolios. Delete one to add a new one.",
                    400
                )
            );
        }

        // create new portfolio
        const newPortfolio = {
            user: req.user._id,
            store_id: product.store_id,
            sku_marketplace: product.sku_marketplace,
            store_products: [product],
        };

        await Portfolio.create(newPortfolio);
        return res.status(201).json({
            status: "success",
            data: newPortfolio,
        });
    }

    portfolio.store_products.push(product);
    await portfolio.save();

    res.status(200).json({
        status: "success",
        data: portfolio,
    });
});

exports.portfolioBulkWrite = catchAsyncErrors(async (req, res, next) => {
    const data = req.body;
    const user = req.user._id;

    // check if data is an array
    if (!Array.isArray(data))
        return next(new AppError("data must be an array"));

    // check if data is empty
    if (data.length === 0) return next(new AppError("data must not be empty"));

    // check if data is an array of objects
    if (!data.every((item) => typeof item === "object")) {
        return next(new AppError("data must be an array of objects"));
    }

    // first check if portfolio exists
    const portfolio = await Portfolio.find({ user }).select("store_id");

    // make a new array of store_id
    const storeIds = portfolio.map((item) => item.store_id);

    // group data by store_id
    const groupedData = data.reduce((acc, item) => {
        const key = item.store_id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    // keep only those groups data that are in storeIds
    const storeIdsInPortfolio = Object.keys(groupedData).filter((key) =>
        storeIds.includes(key)
    );

    // create an array of promises
    storeIdsInPortfolio.map(async (key) => {
        // find portfolio by store_id
        const portfolio = await Portfolio.findOne({
            store_id: key,
            user,
        });

        // add products to store_products
        portfolio.store_products = portfolio.store_products.concat(
            groupedData[key]
        );

        // save portfolio
        await portfolio.save();
    });

    res.status(204).send();
});

exports.getEmptySkus = catchAsyncErrors(async (req, res) => {
    const data = await Portfolio.aggregate([
        // remove empty store_products
        {
            $match: {
                store_products: { $ne: [] },
            },
        },
        // unwind store_products
        {
            $unwind: "$store_products",
        },
        // keep only sku_marketplace and sku
        {
            $project: {
                sku: "$store_products.sku",
                sku_marketplace: "$store_products.sku_marketplace",
            },
        },
        // remove empty sku
        {
            $match: {
                sku: { $ne: "" },
            },
        },
        // populate with sku_marketplace and sku
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
                                        $eq: [
                                            "$sku_marketplace",
                                            "$$sku_marketplace",
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "product",
            },
        },
        // keep only those that are not in products
        {
            $match: {
                product: { $eq: [] },
            },
        },
        // keep only sku_marketplace and sku
        {
            $project: {
                _id: 0,
                sku: 1,
                sku_marketplace: 1,
            },
        },

        ...req.pipeline,
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
    });
});

exports.portfolioTable = catchAsyncErrors(async (req, res) => {
    const data = await Portfolio.aggregate([
        {
            $match: {
                user: mongoose.Types.ObjectId(req.user._id),
            },
        },
        // remove empty store_products
        {
            $match: {
                store_products: { $ne: [] },
            },
        },
        // unwind store_products
        {
            $unwind: "$store_products",
        },
        // keep only sku_marketplace and sku
        {
            $project: {
                sku: "$store_products.sku",
                sku_marketplace: "$store_products.sku_marketplace",
            },
        },
        // remove empty sku
        {
            $match: {
                sku: { $ne: "" },
            },
        },
        // populate with sku_marketplace and sku
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
                                        $eq: [
                                            "$sku_marketplace",
                                            "$$sku_marketplace",
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "product",
            },
        },
        // keep only those that are  in products
        {
            $match: {
                product: { $ne: [] },
            },
        },
        //unwind product
        {
            $unwind: "$product",
        },
        // set new root to product
        {
            $replaceRoot: {
                newRoot: "$product",
            },
        },

        ...req.pipeline,
    ]);

    res.status(200).json({
        success: true,
        total: data[0].total?.[0]?.total || 0,
        result: data[0].data.length,
        data: data[0].data,
    });
});
