import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_DISH_IMG"> {
  public on = "DELETE_DISH_IMG" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, index, image }: WS.Params.deleteDishImg
  ) {
    const userId = client.data.userId;
    const dish = await deps.Dishes.get(id);
    if (!dish) throw new Error("Dish not found");
    await deps.WSGuard.canModify(userId, dish.owner!.toString());
    if (
      index < 0 ||
      index >= dish.images.length ||
      dish.images[index] !== image
    )
      throw new Error("Image not found");

    dish.images.splice(index, 1);
    await dish.save();
    return [
      {
        emit: this.on,
        to: [userId],
        data: { id, index, image },
      },
    ];
  }
}
