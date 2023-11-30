module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "ERROR";
  res.status(error.statusCode).json({
    status: error.status,
    msg: error.message,
  });
};
