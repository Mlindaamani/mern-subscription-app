const { upload } = require("../middleware/fileUploadMiddleware.js");
const {
  uploadVideo,
  downloadVideo,
  getVideoById,
  videos,
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

//VIDEO ROUTES
videoRouter.post(
  "/upload",
  userIsAuthenticatedMiddleware,
  userIsACreatorMiddleware,
  upload.single("file"),
  uploadVideo
);

videoRouter.get("/", videos);

videoRouter.get("/download/:id", userIsAuthenticatedMiddleware, downloadVideo);

videoRouter.get(
  "/:id",
  userIsAuthenticatedMiddleware,
  userHasSubscribedMiddleware,
  getVideoById
);

module.exports = { videoRouter };
