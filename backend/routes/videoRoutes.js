const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const fileUploadMiddleware = require("../middleware/fileUploadMiddleware.js");
const subscriptionMiddleware = require("../middleware/subscriptionMiddleware.js");

router.post(
  "/upload",
  authMiddleware.userIsAuthenticatedMiddleware,
  authMiddleware.userIsACreatorMiddleware,
  fileUploadMiddleware.single("file"),
  videoController.uploadVideo
);

router.get(
  "/",
  // authMiddleware.userIsAuthenticatedMiddleware,
  videoController.videos
);

router.get(
  "/download/:id",
  authMiddleware.userIsAuthenticatedMiddleware,
  videoController.downloadVideo
);

router.get(
  "/:id",
  authMiddleware.userIsAuthenticatedMiddleware,
  subscriptionMiddleware.userHasSubscribedMiddleware,
  videoController.getVideoById
);

module.exports = router;
