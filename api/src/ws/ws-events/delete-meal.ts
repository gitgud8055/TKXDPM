import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_MEAL"> {
  public on = "DELETE_MEAL" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id }: WS.Params.deleteMeal
  ) {
    const userId = client.data.userId;
    // const meal = await deps.Meals.get(id);
    // if (!meal) throw new Error("Meal not found");
    await deps.Meals.delete(id);
    return [];
  }
}
