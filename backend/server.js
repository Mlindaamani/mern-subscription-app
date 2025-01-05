require("dotenv").config();
const { corsConfiguration, startServer } = require("./utils/functions");
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const {
  userRouter,
  videoRouter,
  paymentRoutes,
  subscriptionRoutes,
  authorRouter,
  messageRoutes,
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
app.use("/api/auth", authorRouter);
app.use("/api/videos", videoRouter);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRouter);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/messages", messageRoutes);

// Server Instance
server.listen(process.env.PORT, () => {
  startServer();
  connnectToMongoDb();
});

app.use(errorMiddleware);
