const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const corsConfiguration = {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

const formatVideoThumbnail = (videoUrl, req) => {
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/${videoUrl}`;
};

const verifyMongoDbId = (videoId) => {
  return mongoose.Types.ObjectId.isValid(videoId);
};

const startServer = () => {
  console.log(
    `✅ Success! Server is running on http://localhost:${process.env.PORT}`
  );
};

module.exports = {
  corsConfiguration,
  generateAccessToken,
  generateRefreshToken,
  formatVideoThumbnail,
  verifyMongoDbId,
  startServer,
};
