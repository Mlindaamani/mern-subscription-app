const { authorRouter } = require("./authRoutes");
const { messageRoutes } = require("./messageRoutes");
const { subscriptionRoutes } = require("./subscriptionRoutes");
const { paymentRoutes } = require("./paymentRoutes");
const { videoRouter } = require("./videoRoutes");
const { userRouter } = require("./userRouters");

module.exports = {
  authorRouter,
  messageRoutes,
  paymentRoutes,
  subscriptionRoutes,
  userRouter,
  videoRouter,
};
