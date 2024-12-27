import { io } from "socket.io-client";
import { WS } from "@gitgud/types";
import event from "./event-service";

const ws = io("http://localhost:3000", {
  withCredentials: true,
});
export default ws as WSClient;
ws.on("connect", () => event.emit("WSConnected"));

export interface WSClient {
  emit: <K extends keyof WS.To>(event: K, data: WS.To[K]) => any;
  on: <K extends keyof WS.From>(
    event: K | "error" | "disconnect",
    callback: (args: WS.From[K]) => any
  ) => any;
  off: (event: string, callback: any) => any;
  disconnect: () => any;
}
