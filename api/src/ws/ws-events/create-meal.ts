import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_MEAL"> {
  public on = "CREATE_MEAL" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { name, images, dishIds, date }: WS.Params.createMeal
  ) {
    const userId = client.data.userId;
    const dishes = new Set(
      (await deps.Dishes.getList(dishIds)).map((x) => x._id.toString())
    );
    await deps.Meals.create({
      name,
      images,
      dishes: dishIds.filter((x) => dishes.has(x)),
      date,
    });
    return [];
  }
}
