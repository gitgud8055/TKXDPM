import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_REF_FOOD"> {
  public on = "CREATE_REF_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { foodId, quantity, unit, note }: WS.Params.createRefFood
  ) {
    const food = await deps.Foods.get(foodId);
    if (!food) {
      throw new Error("Food not found");
    }
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
