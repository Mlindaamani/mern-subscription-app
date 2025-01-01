const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = Schema(
  {
    sender: {
      type: String,
      required: [true, "Sender is required"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Message", messageSchema);
