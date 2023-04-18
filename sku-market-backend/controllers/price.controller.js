const mongoose = require("mongoose");
const catchAsyncErrors = require("../lib/catchAsyncErrors");
const priceModel = require("../models/price.model");
const Product = require("../models/product.model");
const AppError = require("../util/appError");

// create new price for a product
exports.updatePrice = catchAsyncErrors(async (req, res, next) => {
  const price = req.body.price || 0;

  const product = await Product.findById(req.params.id);

  //if product is not found
  if (!product)
    return next(
      new AppError(`Product with id ${req.params.id} is not found`, 404)
    );

  //find price by product id
  const doc = await priceModel.findOne({ product: req.params.id });

  if (doc) {
    //if price exists, update it
    doc.price = req.body.price;
    doc.save();

    const history = [
      {
        price,
        date: new Date().toISOString(),
      },
      ...doc.price_history,
    ];

    // update product
    product.current_price = price;
    product.price_updated_at = Date.now();
    product.getTopBottomPrice = getTopBottomPrice(history);
    product.yearlyPrice = getAverageYearlyPrice(history);
    product.monthlyPrice = getMontyAveragePrice(history);
    product.dailyPrice = getDailyPrice(history);
    product.price_change = getPercentageChange(price, doc.price);

    await product.save();

    // send response
    return res.status(200).json({
      success: true,
      message: "Price updated successfully",
      price: doc,
    });
  }

  //if price does not exist, create new price
  const newPrice = await priceModel.create({
    product: req.params.id,
    price: req.body.price,
  });

  res.status(201).json({
    status: "success",
    price: newPrice,
  });
});

exports.getPrice = catchAsyncErrors(async (req, res, next) => {
  const price = await priceModel
    .aggregate([
      {
        $match: {
          product: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $project: {
          price: 1,
          date: 1,
          price_history: {
            $filter: {
              input: "$price_history",
              as: "price_history",
              cond: {
                $gte: [
                  "$$price_history.date",
                  new Date(Date.now() - 24 * 60 * 60 * 1000),
                ],
              },
            },
          },
        },
      },
    ])
    .exec();

  const priceHistory = price[0].price_history.map((item) => {
    return [item.date.getTime(), item.price];
  });

  res.status(200).json({
    status: "success",
    priceHistory,
  });
});

function getTopBottomPrice(priceHistory) {
  const topPrice = {
    last24Hours: 0,
    last7Days: 0,
    last2Weeks: 0,
    last30Days: 0,
  };

  const bottomPrice = {
    last24Hours: 0,
    last7Days: 0,
    last2Weeks: 0,
    last30Days: 0,
  };

  const last24Hours = priceHistory.filter(
    (price) =>
      new Date().getTime() - new Date(price.date).getTime() <
      24 * 60 * 60 * 1000
  );

  const last7Days = priceHistory.filter(
    (price) =>
      new Date().getTime() - new Date(price.date).getTime() <
      7 * 24 * 60 * 60 * 1000
  );

  const last2Weeks = priceHistory.filter(
    (price) =>
      new Date().getTime() - new Date(price.date).getTime() <
      2 * 7 * 24 * 60 * 60 * 1000
  );

  const last30Days = priceHistory.filter(
    (price) =>
      new Date().getTime() - new Date(price.date).getTime() <
      30 * 24 * 60 * 60 * 1000
  );

  topPrice.last24Hours = Math.max(...last24Hours.map((price) => price.price));
  topPrice.last7Days = Math.max(...last7Days.map((price) => price.price));
  topPrice.last2Weeks = Math.max(...last2Weeks.map((price) => price.price));
  topPrice.last30Days = Math.max(...last30Days.map((price) => price.price));

  bottomPrice.last24Hours = Math.min(
    ...last24Hours.map((price) => price.price)
  );
  bottomPrice.last7Days = Math.min(...last7Days.map((price) => price.price));
  bottomPrice.last2Weeks = Math.min(...last2Weeks.map((price) => price.price));
  bottomPrice.last30Days = Math.min(...last30Days.map((price) => price.price));

  return { topPrice, bottomPrice };
}

function getAverageYearlyPrice(priceHistory) {
  // get the current year
  const currentYear = new Date().getFullYear();
  // create a array of 12 months of current year and month look like 2020-10-1

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return `${currentYear}-${month}-1`;
  });

  // loop through the dates array
  const yearlyPrice = months.map((month) => {
    // get the price of that month
    const prices = priceHistory.filter(
      (price) =>
        new Date(price.date).getFullYear() === new Date(month).getFullYear() &&
        new Date(price.date).getMonth() === new Date(month).getMonth()
    );

    // if no price found in that month
    if (prices.length === 0) {
      return {
        date: month,
        price: 0,
      };
    }

    // get the average price of that month
    const averagePrice =
      prices.reduce((acc, price) => acc + price.price, 0) / prices.length;

    return {
      date: month,
      price: Math.floor(averagePrice),
    };
  });

  return yearlyPrice;
}

function getMontyAveragePrice(priceHistory) {
  // create a array of all dates of current month
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = i + 1;
    return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${date}`;
  });

  // loop through the dates array and get the price of that date
  const monthlyPrice = dates.map((date) => {
    const prices = priceHistory.filter(
      (price) =>
        new Date(price.date).getFullYear() === new Date(date).getFullYear() &&
        new Date(price.date).getMonth() === new Date(date).getMonth() &&
        new Date(price.date).getDate() === new Date(date).getDate()
    );

    // if no price found in that date
    if (prices.length === 0) {
      return {
        date,
        price: 0,
      };
    }

    // get average price of that date
    const averagePrice =
      prices.reduce((acc, price) => acc + price.price, 0) / prices.length;

    return {
      date,
      price: Math.floor(averagePrice),
    };
  });

  return monthlyPrice;
}

function getDailyPrice(priceHistory) {
  const result = priceHistory.filter(
    (price) =>
      new Date().getTime() - new Date(price.date).getTime() <
      24 * 60 * 60 * 1000
  );

  // if the result length is greater than 15 then return the last 15 items
  if (result.length > 15) {
    return result.slice(result.length - 15);
  }

  return result;
}

function getPercentageChange(previousPrice, currentPrice) {
  // both ar the same return 0
  if (previousPrice === currentPrice) {
    return 0;
  }

  const change = ((currentPrice - previousPrice) / previousPrice) * 100;

  return change?.toFixed(2) || 0;
}
