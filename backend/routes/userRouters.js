const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/",
  authMiddleware.userIsAuthenticatedMiddleware,
  userController.getAllUsers
);

router.get(
  "/profile",
  authMiddleware.userIsAuthenticatedMiddleware,
  userController.profile
);

router.get(
  "/:id",
  authMiddleware.userIsAuthenticatedMiddleware,
  userController.getUserById
);

module.exports = router;
