// get user's notification

const catchAsyncErrors = require('../lib/catchAsyncErrors');
const Notification = require('../models/notification.model');
const AppError = require('../util/appError');

exports.getUnReadNotifications = catchAsyncErrors(async (req, res, next) => {
    const page = req.query?.page * 1 || 1;
    const limit = req.query?.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({
        user: req.user._id,
        read: false,
    })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Notification.countDocuments({
        user: req.user._id,
        read: false,
    });

    res.status(200).json({
        success: true,
        total,
        notifications,
    });
});

// get all notifications

exports.getNotifications = catchAsyncErrors(async (req, res, next) => {
    const page = req.query?.page * 1 || 1;
    const limit = req.query?.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ user: req.user._id })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await Notification.countDocuments({ user: req.user._id });

    res.status(200).json({
        success: true,
        total,
        notifications,
    });
});

// find notification by id and update it to read

exports.markAsRead = catchAsyncErrors(async (req, res, next) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { read: true }
    );

    if (!notification) {
        return next(new AppError('Notification not found', 404));
    }

    res.status(200).json({
        success: true,
    });
});

// make all unread notifications as read

exports.markAllAsRead = catchAsyncErrors(async (req, res, next) => {
    await Notification.updateMany(
        { user: req.user._id, read: false },
        { read: true }
    );

    res.status(200).json({
        success: true,
    });
});

// delete a notification

exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
        return next(new AppError('Notification not found', 404));
    }

    res.status(200).json({
        success: true,
    });
});

// delete all notifications

exports.deleteAllNotifications = catchAsyncErrors(async (req, res, next) => {
    await Notification.deleteMany({ user: req.user._id });

    res.status(200).json({
        success: true,
    });
});
