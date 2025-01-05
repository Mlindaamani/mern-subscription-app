const { sendMessage } = require("../controllers/messageController");

const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware");

const express = require("express");
const messageRouter = express.Router();

messageRouter.post(
  "/send/:receiverId",
  userIsAuthenticatedMiddleware,
  sendMessage
);

module.exports = messageRouter;
