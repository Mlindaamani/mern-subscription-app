const { Subscription } = require("../models/Subscription");

const userHasSubscribedMiddleware = async (req, res, next) => {
  const { id: userId } = req.user;

  try {
    const subscription = await Subscription.findOne({ user: userId }).populate(
      "user",
      ["username", "_id"]
    );
    
    if (!subscription) {
      return res.status(403).json({
        message: "You have no active subscription!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userHasSubscribedMiddleware,
};
