const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

exports.formatVideoThumbnail = (videoUrl, req) => {
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/${videoUrl}`;
};

exports.verifyMongoDbId = (videoId) => {
  return mongoose.Types.ObjectId.isValid(videoId);
};

exports.verifyContentType = () => {
  return "Verifying the content type of the file";
};
