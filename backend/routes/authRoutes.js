const express = require("express");
const authorRouter = express.Router();
const {
  register,
  refreshToken,
  login,
} = require("../controllers/authController");

authorRouter.post("/register", register);
authorRouter.post("/login", login);
authorRouter.post("/refresh-token", refreshToken);

module.exports = { authorRouter };
