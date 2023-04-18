const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: [true, "Store name is required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product id is required"],
    },
    store_id: {
      type: String,
      required: [true, "Store id is required"],
    },
    store_offer_price: {
      type: Number,
      required: [true, "Store offer price is required"],
    },
    store_rating: {
      type: Number,
      default: 0,
    },
    store_soh: {
      type: Number,
      default: 0,
    },
    store_offer_rank: {
      type: Number,
      required: [true, "Store offer rank is required"],
    },
    store_fulfilment_type: {
      type: String,
      required: [true, "Store fulfillment type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
