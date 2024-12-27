import { Socket } from "socket.io";
import { Websocket } from "./websocket";
import { WS } from "@gitgud/types";

export interface WSEvent<K extends keyof WS.To> {
  on: K;
  invoke: (
    ws: Websocket,
    client: Socket,
    data: WS.To[K]
  ) => Promise<WSAction<keyof WS.From>[]>;
}

export interface WSAction<K extends keyof WS.From> {
  emit: K;
  to: string[];
  data: WS.From[K];
}
