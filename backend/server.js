require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const corsConfiguration = require("./utils/cors-data");
const Message = require("./models/Message");
const errorMiddleware = require("./middleware/errorMiddleware");
const connection = require("./config/database");
const userAuthenticationRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const userRouters = require("./routes/userRouters");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

//Initialize SocketIO Server
const server = http.createServer(app);
const io = socketIo(server, corsConfiguration);

io.on("connection", (socket) => {
  socket.on("sendMessage", async (messageData) => {
    await Message.create(messageData);
    io.emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User has disconnected from the chat!");
  });
});

//Middleware Configuration
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Routes Mapping
app.use("/api/auth", userAuthenticationRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRouters);
app.use("/api/subscription", subscriptionRoutes);

//Express Server Instance
server.listen(process.env.PORT, () => {
  console.log(
    `✅ Success! Server is running on http://localhost:${process.env.PORT}`
  );
  connection.connectToMongoDb();
});

//Catch-all-errors middleware
app.use(errorMiddleware.errorMiddleware);
