const Product = require('../models/product.model');
const mongoose = require('mongoose');
const AppError = require('../util/appError');

const requestProductSchema = new mongoose.Schema(
    {
        sku: [
            {
                type: String,
                required: [true, 'sku is required'],
                unique: true,
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const RequestProduct = mongoose.model('RequestProduct', requestProductSchema);

module.exports = RequestProduct;
