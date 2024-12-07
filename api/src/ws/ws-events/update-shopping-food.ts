import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_SHOPPING_FOOD"> {
  public on = "UPDATE_SHOPPING_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, quantity, note }: WS.Params.updateShoppingFood
  ) {
    const shoppingFood = await deps.ShoppingFood.update({
      id,
      quantity,
      note,
    });

    return [];
  }
}
