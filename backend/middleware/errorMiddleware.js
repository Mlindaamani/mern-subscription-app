const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { errorMiddleware };
