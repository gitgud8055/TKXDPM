import { WSEvent } from "./../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"TEST"> {
  public on = "TEST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { message }: WS.Params.test
  ) {
    console.log(message);
    return [];
  }
}
