const { upload } = require("../middleware/fileUploadMiddleware.js");
const {
  uploadVideo,
  downloadVideo,
  getVideoById,
  videos,
  getLatestVideos,
} = require("../controllers/videoController.js");

const {
  userHasSubscribedMiddleware,
} = require("../middleware/subscriptionMiddleware.js");

const {
  userIsACreatorMiddleware,
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware.js");

const express = require("express");
const videoRouter = express.Router();

videoRouter.get(
  "/:videoId",
  userIsAuthenticatedMiddleware,
  userHasSubscribedMiddleware,
  getVideoById
);

videoRouter.post(
  "/upload",
  userIsAuthenticatedMiddleware,
  userIsACreatorMiddleware,
  upload.single("file"),
  uploadVideo
);

videoRouter.get("/", userIsAuthenticatedMiddleware, videos);

videoRouter.get("/download/:id", userIsAuthenticatedMiddleware, downloadVideo);

videoRouter.get("/latest", userIsAuthenticatedMiddleware, getLatestVideos);

module.exports = { videoRouter };
