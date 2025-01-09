const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const videoSchema = Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  fileUrl: {
    type: String,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  uploadDate: {
    type: Date,
    default: Date.now,
  },

  views: {
    type: Number,
    default: 0,
  },

  downloads: {
    type: Number,
    default: 1,
  },

  likes: {
    type: Number,
    default: 0,
    require: false,
  },
});

const Video = model("Video", videoSchema);
module.exports = { Video };
