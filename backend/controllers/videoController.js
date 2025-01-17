const { Video } = require("../models/Video.js");
const {
  formatVideoThumbnail,
  verifyMongoDbId,
} = require("../utils/functions.js");

//SENDER = 67771dea999ed7ad666711b6
//RECEIVER_MESSAGE_ID 67770d047fb71c1020eb09a9
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
    return res.status(400).json({ message: "Kindly fill all fields" });
  }

  const { filename } = req.file;
  const { title, description } = req.body;
  const fileUrl = `uploads/${filename}`;

  try {
    await Video.create({
      title: title,
      description: description,
      fileUrl: fileUrl,
      creator: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Video Uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const videos = async (req, res) => {
  try {
    const video = await Video.find().populate("creator", ["name", "email"]);
    video.forEach((video) => {
      video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    });
    return res.status(200).json(video);
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
  const { id: videoId } = req.params;
  const { hasPaid } = req.user;

  console.log(req.user);

  // Verify the incomming Video Id
  if (!verifyMongoDbId(videoId)) {
    return res.status(400).json({
      message: "Video not found. Try a valid ID",
    });
  }

  // Check wether a user paid
  if (!hasPaid) {
    return res
      .status(403)
      .json({ message: "You have no active subscription!" });
  }

  try {
    const video = await Video.findById({ _id: videoId });
    if (!video) {
      return res
        .status(404)
        .json({ message: "The requested video was not found" });
    }

    video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    return res.json({ video });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server  Error");
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */

const downloadVideo = async (req, res) => {
  const { id: videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    if (video) {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          views: (video.views += 1),
          downloads: (video.downloads += 1),
        },
        { new: true }
      );
      return res.download(video.fileUrl, video.title);
    } else {
      return res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to download video" });
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getLatestVideos = async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json({ message: "Your retrieved successfully", user: user });
};

module.exports = {
  downloadVideo,
  getVideoById,
  videos,
  uploadVideo,
  getLatestVideos,
};
