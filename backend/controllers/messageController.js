const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { id: senderId } = req.user;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (conversation === null) {
      await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      receiverId,
      senderId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([newMessage.save(), conversation.save()]);

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
