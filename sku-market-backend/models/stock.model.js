const mongoose = require('mongoose');

// create stock model for product
const stockSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'product is required'],
        },
        stock: {
            type: Number,
            required: [true, 'stock is required'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        stock_history: [
            {
                stock: {
                    type: Number,
                    required: [true, 'stock is required'],
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// if stock is changed update stock history and

stockSchema.pre('save', async function (next) {
    if (this.isModified('stock')) {
        this.stock_history.push({
            stock: this.stock,
            date: Date.now(),
        });
    }
    next();
});

// create a stock model
const Stock = mongoose.model('Stock', stockSchema);

// export stock model
module.exports = Stock;
