const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    enum: ["household", "repairProfessional"],
    required: true,
  },

  profilePicture: {
    type: String,
    default: "default.jpg",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User ", userSchema);
