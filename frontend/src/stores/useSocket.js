import create from "zustand";
import { io } from "socket.io-client";
import { authStore } from "./authStore";
import { messageStore } from "./messaggeStore";
import toast from "react-hot-toast";
const { VITE_SOCKET_URL } = import.meta.env;

export const useSocket = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectToSocketServer: () => {
    const { user } = authStore.getState();

    const socket = io(VITE_SOCKET_URL, {
      query: {
        userId: user?.id,
      },
    });

    socket.connect();
    set({ socket: socket });

    socket.on("new-message", (newMessage) => {
      const { addMessage } = messageStore.getState();
      addMessage(newMessage);
    });

    socket.on("join-chat", (userId) => {
      toast.success(` ${userId} User joined chat`, {
        id: "join-chat",
        duration: 5000,
        position: "bottom-right",
      });
    });

    socket.on("leave-chat", (userId) => {
      toast.success(`User: ${userId} has left a chat`, {
        id: "join-chat",
        duration: 5000,
        position: "bottom-right",
      });
    });

    socket.on("online-users", (usersId) => {
      set({ onlineUsers: usersId });
    });
  },

  disconnect: () => {
    const { socket } = get();
    socket.disconnect();
  },
}));
