const { startServer } = require("./utils/functions");
const { server, app, express } = require("./server/socket");
const cors = require("cors");
const morgan = require("morgan");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { connnectToMongoDb } = require("./config/database");
const {
  userRouter,
  videoRouter,
  paymentRouter,
  subscriptionRouter,
  authRouter,
  messageRouter,
} = require("./routes");

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
server.listen(process.env.PORT, async () => {
  startServer();
  await connnectToMongoDb();
});

app.use(errorMiddleware);
