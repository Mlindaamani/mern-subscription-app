const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const reviewSchema = Schema({
  repairProfessionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairProfessional",
    required: true,
  },

  householdId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);
module.exports = { Review };
