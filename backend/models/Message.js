const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender is required"],
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The sender id is required"],
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

const Message = model("Message", messageSchema);
module.exports = { Message };
