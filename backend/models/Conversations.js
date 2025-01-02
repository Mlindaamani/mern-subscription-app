const mongoose = require("mongoose");
const { Model, Schema } = mongoose;

const converstionSchema = Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],

    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      upddatedAt: "updated_at",
    },
  }
);

module.exports = Model("Conversation", converstionSchema);
