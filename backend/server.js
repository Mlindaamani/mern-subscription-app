require("dotenv").config();
const utils = require("./utils/functions");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const corsConfiguration = require("./utils/cors-data");
const errorMiddleware = require("./middleware/errorMiddleware");
const connection = require("./config/database");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes");

// Initialize SocketIO Server
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
app.use("/api/auth", router.authenticationRoutes);
app.use("/api/videos", router.videoRoutes);
app.use("/api/payments", router.paymentRoutes);
app.use("/api/users", router.userRoutes);
app.use("/api/subscription", router.subscriptionRoutes);
app.use("/api/messages", router.messageRoutes);

// Server Instance
server.listen(process.env.PORT, () => {
  utils.startServer();
  connection.connectToMongoDb();
});

app.use(errorMiddleware.errorMiddleware);
