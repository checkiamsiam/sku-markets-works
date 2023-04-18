const BillingInfo = require("../models/billingInfo.model");
const catchAsyncErrors = require("../util/catchAsyncErrors");

// Add a new Billing Information/Address
exports.addNewInfo = catchAsyncErrors(async (req, res, next) => {
  const { title, email, phone, address, city, state, zipCode, country } =
    req.body;

  const info = {
    userId: req.user._id,
    title,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    country,
  };

  const billingInfo = await BillingInfo.create(info);

  res.status(201).json({
    success: true,
    message: "Billing Information Added",
    data: { _id: billingInfo._id, ...info, createdAt: billingInfo.createdAt },
  });
});

// Get user billing addresses by user id
exports.getBillingInfo = catchAsyncErrors(async (req, res, next) => {
  const data = await BillingInfo.find({ userId: req.user._id });

  res.status(200).json({
    success: true,
    data,
  });
});

// Delete billing addresses by Id
exports.deleteBillingInfo = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.body;
  await BillingInfo.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Billing Address Deleted",
  });
});

// Update billing addresses by Id
exports.updateBillingInfo = catchAsyncErrors(async (req, res, next) => {
  const { _id, title, email, phone, address, city, state, zipCode, country } =
    req.body;

  const result = await BillingInfo.updateOne(
    { _id },
    { title, email, phone, address, city, state, zipCode, country },
    { runValidators: true }
  );

  console.log(result);

  res.status(200).json({
    success: true,
    message: "Billing Address updated",
    data:result
  });
});
