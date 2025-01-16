const { Message } = require("../models/Message");
const { Conversation } = require("../models/Conversation");

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 T

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ created_at: "asc" }).limit(100);
  return res.status(200).json({ messages: messages });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getSenderMessages = async (req, res) => {
  const { id: senderId } = req.user;

  const messages = await Message.find({ senderId: senderId }).sort({
    created_at: "desc",
  });

  if (messages.length > 0) {
    res.status(200).json({ messages: messages });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { id: senderId } = req.user;
    const { message } = req.body;

    // Validate the message content.
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message content cannot be empty.",
      });
    }

    // Find the existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create the new message
    const newMessage = await Message.create({
      receiverId,
      senderId,
      message,
    });

    // Push the new message ID to the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save the updated conversation
    await conversation.save();

    // SERVER EMITS 'newMessage' EVENT
    // Emit the new message to the receiver via WebSocket
    // io.to(receiverId).emit("newMessage", {
    //   message: newMessage,
    //   senderId,
    //   receiverId,
    // });

    res.status(201).json({
      message: "Message Sent successfully!",
      message: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { sendMessage, getMessages, getSenderMessages };

// CLIENT LISTEN FOR 'newMessage' EVENT
// const socket = io();
// // Listen for new messages
// socket.on("newMessage", (data) => {
//   const { message, senderId, receiverId } = data;
//   // Update your UI to display the new message
//   console.log(`New message from ${senderId}: ${message}`);
// Update your message list or chat window here
// });

// AGGREGATION PIPELINE
// const results = await Message.aggregate([
//   { $match: { conversationId: conversationId } }, // Stage 1: Filter messages for a specific conversation
//   { $sort: { created_at: 1 } }, // Stage 2: Sort messages by creation date (ascending)
//   {
//     $group: {
//       _id: "$senderId",
//       count: { $sum: 1 },
//       messages: { $push: "$message" }, //Collects the actual message content into an array of messages
//     },
//   }, // Stage 3: Group by senderId, count messages, and collect messages
//   { $project: { senderId: "$_id", count: 1, messages: 1, _id: 0 } }, // Stage 4: Reshape the output only include senderId, count, messages
// ]);
