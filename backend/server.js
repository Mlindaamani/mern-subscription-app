const { corsConfiguration, startServer } = require("./utils/functions");
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const {
  userRouter,
  videoRouter,
  paymentRouter,
  subscriptionRouter,
  authRouter,
  messageRouter,
} = require("./routes");
const { connnectToMongoDb } = require("./config/database");
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

// Initialize SocketIO Server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, corsConfiguration);

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("sendMessage", async (messageData) => {
    io.emit("receiveMessage", messageData);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Chat close with: ${reason}`);
  });
});

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/users", userRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/messages", messageRouter);

// Server Instance
server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(errorMiddleware);

// const Subscription = require('../models/subscription'); // Adjust the path as necessary
// const User = require('../models/user'); // Assuming you have a User model

// // Upgrade a user's subscription plan
// exports.upgradeSubscription = async (req, res) => {
//   try {
//     const { userId, newPlan } = req.body;

//     // Check if the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User  not found" });
//     }

//     // Find the current subscription
//     const currentSubscription = await Subscription.findOne({ user: userId });
//     if (!currentSubscription) {
//       return res.status(400).json({ message: "User  does not have an active subscription" });
//     }

//     // Check if the new plan is different from the current plan
//     if (currentSubscription.plan === newPlan) {
//       return res.status(400).json({ message: "You are already subscribed to this plan" });
//     }

//     // Calculate the prorated amount (this is a simplified example)
//     const currentPlanPrice = getPlanPrice(currentSubscription.plan); // Implement this function
//     const newPlanPrice = getPlanPrice(newPlan); // Implement this function
//     const proratedAmount = calculateProratedAmount(currentPlanPrice, newPlanPrice, currentSubscription.startDate); // Implement this function

//     // Update the subscription
//     currentSubscription.plan = newPlan;
//     currentSubscription.startDate = Date.now(); // Update the start date
//     currentSubscription.endDate = null; // Set end date based on your logic
//     await currentSubscription.save();

//     // Charge the user for the prorated amount (implement payment processing here)

//     return res.status(200).json({ message: "Subscription upgraded successfully", subscription: currentSubscription });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "An error occurred while upgrading the subscription", error });
//   }
// };

// // Helper functions to get plan prices and calculate prorated amounts
// const getPlanPrice = (plan) => {
//   const prices = {
//     basic: 10, // Example price
//     standard: 20,
//     premium: 30,
//   };
//   return prices[plan] || 0;
// };

// const calculateProratedAmount = (currentPrice, newPrice, startDate) => {
//   // Implement your prorated calculation logic here
//   // For simplicity, let's assume a monthly billing cycle
//   const daysInMonth = 30; // Simplified
//   const daysUsed = (Date.now() - new Date(startDate)) / (1000 * 60 * 60 * 24);
//   const remainingDays = daysInMonth - daysUsed;
//   const proratedCurrent = (currentPrice / daysInMonth) * remainingDays;
//   return newPrice - proratedCurrent;
// };
