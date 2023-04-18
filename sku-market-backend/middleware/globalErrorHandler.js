const AppError = require('../util/appError');

// handel cast error db
const handelCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// handel duplicate error
const handelDuplicateErrorDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message =
        `Duplicate field value: ${value.trim()}. Please use another value!`.replace(
            /['"]+/g,
            ''
        );
    return new AppError(message, 400);
};

// handel validation error
const handelValidationErrorDB = (err) => {
    try {
        const errors = Object.values(err.errors).map((el) => el.message);
        const message = `Invalid input data. ${errors.join('. ')}`;
        return new AppError(message, 400);
    } catch (error) {
        return new AppError(err.message, 400);
    }
};

//send errorProduction to client
const sendErrorProd = (err, res) => {
    // Opertional, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Programming or other unknown error: don't leak error details
    else {
        // 1. Log error
        console.error('Error 💥', err);
        // 2. Send generic message to client
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};

// send errorDevelopment to client
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

// globalErrorHandler
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'CastError') {
        err = handelCastErrorDB(err);
    }

    if (err.code === 11000) {
        err = handelDuplicateErrorDB(err);
    }

    if (err.name === 'ValidationError') {
        err = handelValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token. Please log in again!', 401);
    }

    if (err.name === 'TokenExpiredError') {
        err = new AppError('Token expired. Please log in again!', 401);
    }

    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    } else {
        sendErrorDev(err, res);
    }
};

module.exports = globalErrorHandler;

/* 
create a function that take a string and return a string
input: "Duplicate field value: N13233365A. Please use another value!"
output: "N13233365A"

*/
const getDuplicateValue = (str) => {
    const regex = /Duplicate field value: (.*?). Please use another value!/;
    const match = str.match(regex);
    return match[1];
};
