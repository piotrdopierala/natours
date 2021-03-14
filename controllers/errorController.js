const mongoose = require('mongoose');

const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateKeyErrorDB = (err) => {
  const keyValue = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
  const message = `Duplicate field value: ${keyValue}. Please select different value.`;
  return new AppError(message, 409);
};

const handleValidationErrorDB = (err) => {
  const errorMessages = Object.values(err.errors).map(
    (validationErr) => validationErr.message
  );
  const message = errorMessages.join('. ');
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'developement') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err instanceof mongoose.Error.CastError) {
      error = handleCastErrorDB(err);
    }
    if (error.code === 11000) {
      error = handleDuplicateKeyErrorDB(err);
    }
    if (err instanceof mongoose.Error.ValidationError) {
      error = handleValidationErrorDB(err);
    }
    sendErrorProd(error, res);
  }
};
