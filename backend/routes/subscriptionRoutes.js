const { subscribe } = require("../controllers/subscriptionController.js");
const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware.js");

const express = require("express");
const subscriptionRouter = express.Router();

//Subscription Routes
subscriptionRouter.post("/subscribe", userIsAuthenticatedMiddleware, subscribe);

module.exports = { subscriptionRouter };
