const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        store_id: {
            type: String,
            required: [true, "Store ID is required"],
        },
        sku_marketplace: {
            type: String,
            required: [true, "sku_marketplace is required"],
        },
        store_name: {
            type: String,
        },
        store_url: {
            type: String,
        },
        store_logo: {
            type: String,
        },
        store_description: {
            type: String,
        },
        store_categories: {
            type: Array,
        },
        store_products: [
            {
                sku: {
                    type: String,
                    required: [true, "SKU is required"],
                },
                sku_marketplace: {
                    type: String,
                    required: [true, "sku_marketplace is required"],
                },
                store_id: {
                    type: String,
                    required: [true, "Store ID is required"],
                },
                status: {
                    type: Boolean,
                    default: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// add compound index
portfolioSchema.index({ user: 1, store_id: 1 }, { unique: true });

// check if product exists in portfolio
portfolioSchema.methods.productExists = function ({ sku, sku_marketplace }) {
    return this.store_products.some((product) => {
        return (
            product.sku === sku && product.sku_marketplace === sku_marketplace
        );
    });
};

// before saving portfolio to db, check if product exists in portfolio and remove duplicates
portfolioSchema.pre("save", function (next) {
    const store_products = this.store_products.reverse();

    const uniqueProducts = store_products.filter(
        (product, index, self) =>
            index ===
            self.findIndex(
                (p) =>
                    p.sku === product.sku &&
                    p.sku_marketplace === product.sku_marketplace
            )
    );
    this.store_products = uniqueProducts;

    // remove those products that are not active
    this.store_products = this.store_products.filter(
        (product) => product.status === true
    );

    next();
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
