const {
  checkPaymentStatus,
  processPayment,
  getPaymentById,
  getUserPayments,
} = require("../controllers/js");

const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware.js");

const express = require("express");
const paymentRouter = express.Router();

// Payment routes
paymentRouter.get("/", userIsAuthenticatedMiddleware, getUserPayments);

paymentRouter.get("/:id", userIsAuthenticatedMiddleware, getPaymentById);

paymentRouter.post("/pay", userIsAuthenticatedMiddleware, processPayment);

paymentRouter.get("/status", userIsAuthenticatedMiddleware, checkPaymentStatus);

module.exports = paymentRouter;
