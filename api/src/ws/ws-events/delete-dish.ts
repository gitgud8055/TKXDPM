import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_DISH"> {
  public on = "DELETE_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id }: WS.Params.deleteDish
  ) {
    const userId = client.data.userId;
    const dish = await deps.Dishes.get(id);
    if (!dish) throw new Error("Dish not found");
    await deps.WSGuard.canModify(userId, dish.owner!.toString());
    await deps.Dishes.delete(id);
    return [];
  }
}
