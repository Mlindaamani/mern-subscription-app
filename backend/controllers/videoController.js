const { Video } = require("../models/Video.js");
const {
  formatVideoThumbnail,
  verifyMongoDbId,
} = require("../utils/functions.js");

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

const videos = async (req, res) => {
  try {
    const video = await Video.find().populate("creator", ["name", "email"]);
    video.forEach((video) => {
      video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    });
    return res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).send("Sorry  the server is down");
  }
};

const getVideoById = async (req, res) => {
  const { videoId } = req.params;
  if (!verifyMongoDbId(videoId)) {
    return res.status(400).json({
      message: "Looks like the requested video not found. Try a valid ID",
    });
  }

  if (!req.user.hasPaid) {
    return res
      .status(403)
      .json({ message: "Access denied. You have no active subscription!" });
  }

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: true,
        error: false,
        message: "The requested video was not found",
      });
    }

    video.fileUrl = formatVideoThumbnail(video.fileUrl, req);
    return res.json({
      success: true,
      message: "video retrieve successfully",
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server  Error");
  }
};

const downloadVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (video) {
      await Video.findOneAndUpdate(
        { _id: req.params.id },
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

module.exports = {
  downloadVideo,
  getVideoById,
  videos,
  uploadVideo,
};
