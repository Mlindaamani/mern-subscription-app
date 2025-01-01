const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

//Subscription Routes
router.post(
  "/subscribe",
  authMiddleware.userIsAuthenticatedMiddleware,
  subscriptionController.subscribe
);
module.exports = router;
