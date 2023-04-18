const mongoose = require('mongoose');
const AppError = require('../util/appError');
const Product = require('./product.model');

// create sell model
const sellSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'product is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'quantity is required'],
        },
        price: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// update product stock
sellSchema.pre('save', async function (next) {
    const product = await Product.findById(this.product);

    // if product is not found
    if (!product) {
        return next(
            new AppError(`Product with id ${this.product} is not found`, 404)
        );
    }

    // if stock is not enough
    if (product.estimated_SOH < this.quantity) {
        return next(
            new AppError(
                `Product with id ${this.product} has only ${product.estimated_SOH} in stock`,
                400
            )
        );
    }

    // product sold in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const last24HoursSells = await Sell.find({
        product: this.product,
        date: { $gte: last24Hours },
    });

    product.estimated_SOH -= this.quantity;
    const sold_24_hours = last24HoursSells.reduce(
        (acc, cur) => acc + cur.quantity,
        this.quantity
    );

    product.sold_24_hours = sold_24_hours;
    product.trade_value = product.current_price * sold_24_hours;

    // average selling price
    product.average_selling_price = product.trade_value / sold_24_hours;

    await product.save();

    // set price
    this.price = product.current_price;
    next();
});

// create a sell model
const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;
