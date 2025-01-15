const {
  sendMessage,
  getMessages,
  getSenderMessages,
} = require("../controllers/messageController");

const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware");

const express = require("express");
const messageRouter = express.Router();

messageRouter.get("/", getMessages);

messageRouter.post(
  "/send/:receiverId",
  userIsAuthenticatedMiddleware,
  sendMessage
);

messageRouter.get("/me", userIsAuthenticatedMiddleware, getSenderMessages);

module.exports = { messageRouter };
