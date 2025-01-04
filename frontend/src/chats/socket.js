import { io } from "socket.io-client";
const WEB_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(WEB_SOCKET_URL);
