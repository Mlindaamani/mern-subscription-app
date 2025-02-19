const {
  sendMessage,
  markMessageAsRead,
  getMessagesBetweenUsers,
  deleteConversation,
} = require("../controllers/messageController");

const {
  userIsAuthenticatedMiddleware,
} = require("../middleware/authMiddleware");

const express = require("express");
const messageRouter = express.Router();

//MESSAGES ROUTES
messageRouter.post(
  "/send/:receiverId",
  userIsAuthenticatedMiddleware,
  sendMessage
);

messageRouter.get(
  "/messages-between-users/:receiverId",
  userIsAuthenticatedMiddleware,
  getMessagesBetweenUsers
);

messageRouter.delete("/delete/:conversationId", deleteConversation);

messageRouter.patch("/mark-as-read/:id", markMessageAsRead);

module.exports = { messageRouter };
