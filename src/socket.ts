import { io } from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_URL;
const path = process.env.REACT_APP_SOCKET_PATH;

export const socket = io(url!, {
  autoConnect: true,
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("token"),
  },
  path: path,
});
