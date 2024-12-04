import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_REF_FOOD"> {
  public on = "DELETE_REF_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id }: WS.Params.deleteRefFood
  ) {
    await deps.RefrigeratorFoods.delete(id);
    return [];
  }
}
