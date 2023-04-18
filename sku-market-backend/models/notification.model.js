const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        alert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Alert',
        },
        message: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            default: '',
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// pre save hook
// notificationSchema.pre('save', function (next) {
//     NotiFyHelper(this);
//     next();
// });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
