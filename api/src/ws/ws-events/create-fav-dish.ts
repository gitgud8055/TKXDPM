import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_FAV_DISH"> {
  public on = "CREATE_FAV_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { dishId }: WS.Params.createFavDish
  ) {
    const userId = client.data.userId;
    const dish = await deps.Dishes.get(dishId);
    if (!dish) throw new Error("Dish not found");
    await deps.FavDishes.create({ dish: dishId, user: userId });
    return [];
  }
}
