const { Video } = require("../models/Video.js");
const {
  formatVideoThumbnail,
  verifyMongoDbId,
} = require("../utils/functions.js");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 */
const uploadVideo = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "Kindly fill all fields" });
  }

  const { filename } = req.file;
  const { title, description } = req.body;
  const fileUrl = `uploads/${filename}`;
  const { id: creator } = req.user;

  try {
    await Video.create({
      title: title,
      description: description,
      fileUrl: fileUrl,
      creator: creator,
    });

    res.status(201).json({
      message: "Video Uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const videos = async (req, res) => {
  try {
    const video = await Video.find()
      .populate("creator", ["name", "email"])
      .sort({ uploadDate: "desc" });

    video.forEach((video) => {
      video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    });
    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error!" });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */

const getVideoById = async (req, res) => {
  const { videoId } = req.params;
  const { hasPaid } = req.user;

  // Verify the incomming Video Id
  if (!verifyMongoDbId(videoId)) {
    res.status(400).json({
      message: "Looks like your id is not valid. Try again with valid id!",
    });
  }

  // Check wether a user paid
  if (!hasPaid) {
    return res
      .status(403)
      .json({ message: "You need to pay to view the video!" });
  }

  try {
    const video = await Video.findById({ _id: videoId }).populate("creator", [
      "username",
      "_id",
    ]);

    if (!video) {
      return res
        .status(404)
        .json({ message: "The requested video was not found" });
    }

    video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    return res.status(200).json({ video });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Failed to fetch video content." });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */

const downloadVideo = async (req, res) => {
  const { id: videoId } = req.params;

  // Verify the incoming Video Id
  if (!verifyMongoDbId(videoId)) {
    res.status(400).json({
      message: "Invalid video ID. Please provide a valid ID.",
    });
  }

  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1, downloads: 1 } },
      { new: true }
    );

    if (!video) {
      res.status(404).json({ error: "Video not found" });
    }

    // Return the file for download
    res.download(video.fileUrl, video.title, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ error: "Failed to download video" });
      }
    });
  } catch (error) {
    console.error("Error in downloadVideo:", error);
    res.status(500).json({ error: "Failed to download video" });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getLatestVideos = async (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Your retrieved successfully", user: user });
};

module.exports = {
  downloadVideo,
  getVideoById,
  videos,
  uploadVideo,
  getLatestVideos,
};
