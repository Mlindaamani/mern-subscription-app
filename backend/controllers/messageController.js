exports.createMessageContent = async (req, res) => {
  return res.status(200).json({ message: "Message created successfully" });
};

exports.getAllMessageFromMongoDbDatabase = async (req, res) => {
  return res.status(200).json({
    data: "Getting all the messages",
    success: true,
    error: false,
    creator: "Mlindaamani Stvine",
  });
};
