import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"ADD_DISH_MAT"> {
  public on = "ADD_DISH_MAT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, material }: WS.Params.addDishMat
  ) {
    const dish = await deps.Dishes.getDetail(id);
    if (!dish) throw new Error("Dish not found");
    const userId = client.data.userId;
    await deps.WSGuard.canModify(userId, dish.owner!.toString());
    const food = await deps.Foods.getByName(material.food);
    if (!food) throw new Error("Food not found");
    if (!food.unit.includes(material.unit)) throw new Error("Invalid unit");
    dish.materials.push({
      food: food._id,
      quantity: material.quantity,
      unit: material.unit,
    });
    await dish.save();
    return [];
  }
}