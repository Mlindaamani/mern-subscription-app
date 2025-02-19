const express = require("express");
const { Server } = require("socket.io");
const { corsConfiguration } = require("../utils/functions");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, corsConfiguration);

const onlineUsers = new Map();

const getReceiverSocketId = (receiverId) => {
  return onlineUsers.get(receiverId);
};

io.on("connection", (socket) => {
  console.log("User connected...");

  const { userId } = socket.handshake.query;
  if (userId !== "undefined") {
    onlineUsers.set(userId, socket.id);
  }

  io.emit("join-chat", userId);
  console.log(`User with id: ${userId} has joined the chat...`);

  io.emit("online-users", Array.from(onlineUsers.keys()));
  console.log(onlineUsers);

  socket.on("disconnect", () => {
    console.log(`User with: ${userId} has left a chat..`);

    onlineUsers.delete(userId);
    console.log(onlineUsers);
    io.emit("online-users", Array.from(onlineUsers.keys()));

    io.emit("leave-chat", userId);
  });
});

module.exports = {
  app,
  server,
  io,
  express,
  getReceiverSocketId,
};
