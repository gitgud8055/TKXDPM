import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_REF_FOOD"> {
  public on = "UPDATE_REF_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, quantity, note }: WS.Params.updateRefFood
  ) {
    const food = await deps.RefrigeratorFoods.update({
      _id: id,
      quantity,
      note,
    });
    return [];
  }
}
