const User = require("../models/User.js");
const Payment = require("../models/Payment.js").default;

exports.processPayment = async (req, res) => {
  const { paymentDetails, amount } = req.body;

  try {
    const payment = await Payment.create({
      user: req.user.id,
      amount,
      paymentDetails,
      status: "completed",
    });

    const user = await User.findById(req.user.id);
    user.hasPaid = true;
    await user.save();

    res.status(200).json({ payment, message: "Payment successful" });
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
};

exports.checkPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ user: req.user.id });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "No payment found",
      });
    } else {
      res.json({
        success: true,
        message: "Status checked successfully",
        data: payment,
        status: true,
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user", [
      "name",
      "email",
      "role",
    ]);

    if (req.user.role === process.env.CREDOR_SYS_USER) {
      return res.status(200).json(payments);
    } else {
      return res.status(200).json({
        success: true,
        data: payments.filter((payment) => payment.user.id === req.user.id),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById({ _id: req.params.id });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "No payment found" });
    } else {
      return res.status(200).json({ success: true, data: payment });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
