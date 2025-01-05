const { authRouter } = require("./authRoutes");
const { messageRouter } = require("./messageRoutes");
const { subscriptionRouter } = require("./subscriptionRoutes");
const { paymentRouter } = require("./paymentRoutes");
const { videoRouter } = require("./videoRoutes");
const { userRouter } = require("./userRouters");

module.exports = {
  authRouter,
  messageRouter,
  paymentRouter,
  subscriptionRouter,
  userRouter,
  videoRouter,
};
