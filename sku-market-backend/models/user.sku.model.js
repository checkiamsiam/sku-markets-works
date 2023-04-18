const mongoose = require("mongoose");

const userSkuModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        sku: {
            type: String,
            required: [true, "sku is required"],
        },
        sku_marketplace: {
            type: String,
            required: [true, "sku_marketplace is required"],
        },
        store_id: {
            type: Number,
            required: [true, "store_id is required"],
        },
    },
    {
        timestamps: true,
    }
);

const userSku = mongoose.model("userSku", userSkuModel);

module.exports = userSku;
