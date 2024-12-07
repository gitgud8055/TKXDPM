import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_FAV_DISH"> {
  public on = "DELETE_FAV_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { dishId, token }: WS.Params.deleteFavDish
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    await deps.FavDishes.delete({
      user: userId,
      dish: dishId,
    });
    return [];
  }
}
