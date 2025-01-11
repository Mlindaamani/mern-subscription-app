const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const paymentSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentDetails: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },

  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

paymentSchema.method("setPaymentStatus", function (status) {
  this.status = status;
});

const Payment = model("Payment", paymentSchema);
module.exports = { Payment };
