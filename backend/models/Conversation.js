const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const conversationSchema = Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],

    messages: [{ type: Schema.Types.ObjectId, ref: "Message", default: [] }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      upddatedAt: "updated_at",
    },
  }
);

module.exports = model("Conversation", conversationSchema);
