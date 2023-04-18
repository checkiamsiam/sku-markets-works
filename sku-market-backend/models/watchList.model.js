const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [50, 'Name cannot be more than 50 characters'],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        product: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);

//create index for user and name
watchListSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('WatchList', watchListSchema);
