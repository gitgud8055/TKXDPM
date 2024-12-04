import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"ADD_REF_FOOD"> {
  public on = "ADD_REF_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { foodId, quantity, unit, note }: WS.Params.addRefFood
  ) {
    const food = await deps.Foods.get(foodId);
    if (!food) {
      throw new Error("Food not found");
    }
    // console.log(unit, food.unit, unit in food.unit);
    if (!food.unit.includes(unit)) {
      throw new Error("Invalid unit");
    }

    const refFood = await deps.RefrigeratorFoods.create({
      food: food._id,
      quantity,
      unit,
      note,
    });

    return [];
  }
}
