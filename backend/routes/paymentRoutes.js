const express = require("express");
const paymentController = require("../controllers/paymentController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// Payment routes
router.get(
  "/",
  authMiddleware.userIsAuthenticatedMiddleware,
  paymentController.getUserPayments
);

router.get(
  "/:id",
  authMiddleware.userIsAuthenticatedMiddleware,
  paymentController.getPaymentById
);

router.post(
  "/pay",
  authMiddleware.userIsAuthenticatedMiddleware,
  paymentController.processPayment
);

router.get(
  "/status",
  authMiddleware.userIsAuthenticatedMiddleware,
  paymentController.checkPaymentStatus
);

module.exports = router;
