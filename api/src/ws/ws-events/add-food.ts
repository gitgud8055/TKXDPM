import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"ADD_FOOD"> {
  public on = "ADD_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { name, image, unit, duration }: WS.Params.addFood
  ) {
    const userId = client.data.userId;
    // await deps.WSGuard.canModify(userId, dish.owner!.toString());
    await deps.Foods.create({ name, image, unit, duration });

    return [];
  }
}
