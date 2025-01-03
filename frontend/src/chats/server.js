const io = require("socket.io")(server); // Assuming you have already set up your server

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("message", (data) => {
    io.emit("messageResponse", data); // Broadcast the message to all clients
  });

  // Handle typing event
  socket.on("typing", () => {
    socket.broadcast.emit("typing"); // Notify other clients that someone is typing
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
