const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const serviceSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  repairProfessionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RepairProfessional",
    required: true,
  },
});

const Service = model("Service", serviceSchema);
module.exports = { Service };
