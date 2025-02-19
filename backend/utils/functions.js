const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  return await bcrypt.hash(password, salt);
};

const verifyMongoDbId = (videoId) => {
  return mongoose.Types.ObjectId.isValid(videoId);
};

const startServer = () => {
  console.log(`✔️  Success! Server is running on port: ${process.env.PORT}`);
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
};

module.exports = {
  formatDate,
  corsConfiguration,
  generateAccessToken,
  generateRefreshToken,
  formatVideoThumbnail,
  verifyMongoDbId,
  startServer,
  hashPassword,
};
