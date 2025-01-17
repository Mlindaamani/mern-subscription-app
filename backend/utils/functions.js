const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const corsConfiguration = {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });
};

const formatVideoThumbnail = (videoUrl, req) => {
  const host = req.get("host");
  const protocol = req.protocol;
  return `${protocol}://${host}/${videoUrl}`;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  return await bycrypt.hash(password, salt);
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
  hashPassword,
};
