const catchAsyncErrors = require('../lib/catchAsyncErrors');
const Product = require('../models/product.model');
const AppError = require('../util/appError');
const Sell = require('../models/sell.model');

// create a sell
exports.createSell = catchAsyncErrors(async (req, res, next) => {
    const sell = await Sell.create({
        product: req.params.id,
        quantity: req.body.quantity,
        price: req.body.price,
    });

    res.status(201).json({
        status: 'success',
        sell,
    });
});

// get all sells
exports.getSells = catchAsyncErrors(async (req, res, next) => {
    const sells = await Sell.find();

    res.status(200).json({
        status: 'success',
        sells,
    });
});
