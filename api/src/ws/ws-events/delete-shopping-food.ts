import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_SHOPPING_FOOD"> {
  public on = "DELETE_SHOPPING_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { list, id }: WS.Params.deleteShoppingFood
  ) {
    const user = client.data.userId;
    const shoppingList = await deps.ShoppingList.get(list);
    if (!shoppingList) throw new Error("Shopping list not found");
    await deps.WSGuard.canModify(user, shoppingList.owner!.toString());
    await deps.ShoppingFood.delete(id);
    return [];
  }
}
