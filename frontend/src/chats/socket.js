import { io } from "socket.io-client";
const { VITE_SOCKET_URL } = import.meta.env;

export const socket = io(VITE_SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000,
});
