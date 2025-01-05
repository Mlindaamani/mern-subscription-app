const Subscription = require("../models/Subscription");

const userHasSubscribedMiddleware = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    if (!subscription || !subscription.isActive) {
      return res.status(403).json({
        message: "Acess denied! You have no active subscription!",
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
