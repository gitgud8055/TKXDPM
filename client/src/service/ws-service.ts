import { io, Socket } from "socket.io-client";
import { WS } from "@gitgud/types";
import event from "../service/event-service";

const ws = io("http://localhost:3000", {
  withCredentials: true,
});
ws.on("connect", () => event.emit("WSConnected"));

// let ws;

// function connect() {
//   ws = io("http://localhost:3000", {
//     withCredentials: true,
//   });
//   ws.on("connect", () => event.emit("WSConnected"));
//   ws.on("disconnect", () => disconnect());
// }

// export function getWS() {
//   if (!ws) connect();
//   return ws as WSClient;
// }

// function disconnect() {
//   ws.close();
//   ws = null;
// }

export default ws as WSClient;

export interface WSClient {
  emit: <K extends keyof WS.To>(event: K, data: WS.To[K]) => any;
  on: <K extends keyof WS.From>(
    event: K | "error" | "disconnect" | "connect",
    callback: (args: WS.From[K]) => any
  ) => any;
  off: (event: string, callback: any) => any;
  disconnect: () => any;
  connect: () => any;
  connected: boolean;
}
