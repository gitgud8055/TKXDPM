import { WSAction, WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_FAV_DISH"> {
  public on = "DELETE_FAV_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { dishId }: WS.Params.deleteFavDish
  ) {
    const user = client.data.userId;
    console.log(user);
    const id = (
      await deps.FavDishes.delete({
        user,
        dish: dishId,
      })
    )?._id;
    return [
      {
        emit: this.on,
        to: [client.id],
        data: { id },
      },
    ];
  }
}
