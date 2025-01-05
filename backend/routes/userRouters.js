const {
  getAllUsers,
  profile,
  getUserById,
} = require("../controllers/userController");

const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/", userIsAuthenticatedMiddleware, getAllUsers);

userRouter.get("/profile", userIsAuthenticatedMiddleware, profile);

userRouter.get("/:id", userIsAuthenticatedMiddleware, getUserById);

module.exports = userRouter;
