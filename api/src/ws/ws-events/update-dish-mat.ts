import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_DISH_MAT"> {
  public on = "UPDATE_DISH_MAT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, material }: WS.Params.updateDishMat
  ) {
    const dish = await deps.Dishes.getDetail(id);
    if (!dish) throw new Error("Dish not found");
    const userId = client.data.userId;
    await deps.WSGuard.canModify(userId, dish.owner!.toString());
    const changed = dish.materials.id(material._id);
    if (!changed) throw new Error("Material not found");
    if (!changed.food.unit.includes(material.unit))
      throw new Error("Invalid unit");

    changed.quantity = material.quantity;
    changed.unit = material.unit;
    await dish.save();

    return [
      {
        emit: this.on,
        to: [client.id],
        data: { id, material },
      },
    ];
  }
}
