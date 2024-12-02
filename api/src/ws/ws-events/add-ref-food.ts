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
    const food = await deps.Foods.findOne({ _id: foodId });
    if (!food) {
      return [
        {
          emit: "ERROR",
          to: [client.id],
          send: { message: "Food not found" },
        },
      ];
    }

    const refFood = await deps.RefrigeratorFoods.create({
      food: food._id,
      quantity,
      unit,
      note,
    });

    return [
      {
        emit: "ADD_REF_FOOD",
        to: [client.id],
        send: { refFood },
      },
    ];
  }
}
