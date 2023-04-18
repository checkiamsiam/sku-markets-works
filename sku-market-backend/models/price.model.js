const mongoose = require("mongoose");
const AppError = require("../util/appError");

// create a produce price model
const priceSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    average_price: {
      type: Number,
    },
    price_change: {
      type: Number,
    },
    price_history: [
      {
        price: {
          type: Number,
          required: [true, "price is required"],
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

priceSchema.pre("save", async function (next) {
  // if price is changed, update product price
  if (this.isModified("price")) {
    this.price_history.push({ price: this.price, date: this.date });
  }

  next();
});

module.exports = mongoose.model("Price", priceSchema);
