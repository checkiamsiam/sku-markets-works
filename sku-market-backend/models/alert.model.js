const mongoose = require('mongoose');
const Notification = require('./notification.model');
const Product = require('./product.model');

const alertSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        sku: {
            type: String,
        },

        price: {
            type: Number,
            default: 0,
        },
        price_move_below: {
            type: Number,
            default: 0,
        },
        price_move_above: {
            type: Number,
            default: 0,
        },
        price_range: {
            top: {
                type: Number,
                default: 0,
            },
            bottom: {
                type: Number,
                default: 0,
            },
        },

        stock: {
            type: Number,
            default: 0,
        },
        stock_move_below: {
            type: Number,
            default: 0,
        },
        stock_move_above: {
            type: Number,
            default: 0,
        },
        stock_range: {
            top: {
                type: Number,
                default: 0,
            },
            bottom: {
                type: Number,
                default: 0,
            },
        },

        store: {
            type: Number,
            default: 0,
        },
        store_move_below: {
            type: Number,
            default: 0,
        },
        store_move_above: {
            type: Number,
            default: 0,
        },
        store_range: {
            top: {
                type: Number,
                default: 0,
            },
            bottom: {
                type: Number,
                default: 0,
            },
        },

        is_live: {
            type: Boolean,
        },

        alert_is_live: {
            type: Boolean,
        },

        fulfillment_type: {
            type: String,
        },

        alert_fulfillment_type: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// add a method to the alert schema to check if the alert is triggered
alertSchema.pre('save', async function (next) {
    // first check if the alert is active
    if (this.active) {
        // check if the price is changed
        if (
            this.isModified('price') ||
            this.isModified('price_move_below') ||
            this.isModified('price_move_above') ||
            this.isModified('price_range')
        ) {
            // check if the price is within the price range
            if (
                this.price >= this.price_range.bottom ||
                this.price >= this.price_move_below ||
                this.price <= this.price_move_above ||
                this.price <= this.price_range.top
            ) {
                // create a notification
                const notification = await Notification.create({
                    user: this.user,
                    alert: this._id,
                    message: `Price is ${this.price} for the SKU ${this.sku}`,
                    url: `/product/${this.product._id}`,
                });
            }
        }

        // check if the stock is changed
        if (this.isModified('stock')) {
            // check if the stock is within the stock range
            if (
                this.stock >= this.stock_move_below ||
                this.stock >= this.stock_range.bottom ||
                this.stock <= this.stock_range.top ||
                this.stock <= this.stock_move_above
            ) {
                // create a notification
                const notification = await Notification.create({
                    user: this.user,
                    alert: this._id,
                    message: `Stock is ${this.stock} for the SKU ${this.sku}`,
                    url: `/product/${this.product._id}`,
                });
            }
        }

        // check if the store is changed
        if (this.isModified('store')) {
            // check if the store is within the store range
            if (
                this.store >= this.store_move_below ||
                this.store >= this.store_range.bottom ||
                this.store <= this.store_range.top ||
                this.store <= this.store_move_above
            ) {
                // create a notification
                const notification = await Notification.create({
                    user: this.user,
                    alert: this._id,
                    message: `Store is ${this.store} for the SKU ${this.sku}`,
                    url: `/product/${this.product._id}`,
                });
            }
        }

        // check if the fulfillment type is changed
        if (this.isModified('fulfillment_type')) {
            // check if the fulfillment type is changed
            if (this.fulfillment_type === this.alert_fulfillment_type) {
                // create a notification
                const notification = await Notification.create({
                    user: this.user,
                    alert: this._id,
                    message: `Fulfillment type is ${this.fulfillment_type} for the SKU ${this.sku}`,
                    url: `/product/${this.product._id}`,
                });
            }
        }

        // check if the live status is changed
        if (this.isModified('is_live')) {
            // check if the live status is changed
            if (this.is_live === this.alert_is_live) {
                // create a notification
                const notification = await Notification.create({
                    user: this.user,
                    alert: this._id,
                    message: `Live status is ${this.is_live} for the SKU ${this.sku}`,
                    url: `/product/${this.product._id}`,
                });
            }
        }
    }

    next();
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
