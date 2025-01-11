const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const paymentSchema = Schema({
  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },

  repairProfessionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairProfessional",
    required: true,
  },

  amount: {
    type: Number,
    allow_ampount: '',
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const homeFixPayment = model("Payment", paymentSchema);
module.exports = { homeFixPayment };
