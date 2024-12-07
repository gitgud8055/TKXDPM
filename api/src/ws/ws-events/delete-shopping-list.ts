import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_SHOPPING_LIST"> {
  public on = "DELETE_SHOPPING_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, token }: WS.Params.deleteShoppingList
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    const shoppingList = await deps.ShoppingList.get(id);
    if (!shoppingList) throw new Error("Shopping list not found");
    await deps.WSGuard.canModify(userId, shoppingList.owner!.toString());
    await Promise.all([
      deps.ShoppingList.delete(id),
      deps.ShoppingFood.deleteList(id),
    ]);
    return [];
  }
}
