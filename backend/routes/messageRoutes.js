const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.post(
  "/send/:receiverId",
  authMiddleware.userIsAuthenticatedMiddleware,
  messageController.sendMessage
);

module.exports = router;
