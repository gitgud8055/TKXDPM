import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_DISH"> {
  public on = "UPDATE_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, name, images, information, token }: WS.Params.updateDish
  ) {
    const dish = await deps.Dishes.get(id);
    if (!dish) throw new Error("Dish not found");
    const userId = deps.WSGuard.decodeToken(token);
    await deps.WSGuard.canModify(userId, dish.owner!.toString());

    await deps.Dishes.update({
      id,
      name,
      images,
      information,
    });

    return [];
  }
}