const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const repairProfessionalSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  },

  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  location: {
    type: String,
    required: true,
  },

  availability: {
    type: String,
    required: true,
  },
});

const RepairProfessional = model(
  "RepairProfessional",
  repairProfessionalSchema
);
module.exports = { RepairProfessional };
