require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const corsConfiguration = require("./utils/cors-data");
const errorMiddleware = require("./middleware/errorMiddleware");
const connection = require("./config/database");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const routers = require("./routes");

//Initialize SocketIO Server
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

//Middleware Configuration
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Routes Mapping
app.use("/api/auth", routers.authRoutes);
app.use("/api/videos", routers.videoRouter);
app.use("/api/payments", routers.paymentRouters);
app.use("/api/users", routers.userRoutes);
app.use("/api/subscription", routers.subscriptionRouters);
app.use("/api/messages", routers.messageRouter);

//Express Server Instance
server.listen(process.env.PORT, () => {
  console.log(
    `✅ Success! Server is running on http://localhost:${process.env.PORT}`
  );
  connection.connectToMongoDb();
});

app.use(errorMiddleware.errorMiddleware);