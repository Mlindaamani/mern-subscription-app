import { io } from "socket.io-client";
const SERVER_URL = import.meta.VITE_SOCKET_URL;
export const socket = io(SERVER_URL);
