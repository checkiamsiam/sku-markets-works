const APIFeatures = require('./apiFeatures');
const AppError = require('./appError');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.getAll = (Model, popOptions) =>
    catchAsyncErrors(async (req, res, next) => {
        const features = new APIFeatures(Model.find(), req.query, popOptions)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate();

        const data = await features.query;

        // count documents
        const count = await Model.countDocuments();

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            total: count,
            results: data.length,
            data,
        });
    });

// delete a document
exports.deleteOne = (Model) =>
    catchAsyncErrors(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
