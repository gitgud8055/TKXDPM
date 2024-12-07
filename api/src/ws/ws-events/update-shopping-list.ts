import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_SHOPPING_LIST"> {
  public on = "UPDATE_SHOPPING_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, name, date, note, token }: WS.Params.updateShoppingList
  ) {
    const shoppingList = await deps.ShoppingList.get(id);
    if (!shoppingList) throw new Error("Shopping list not found");
    const userId = deps.WSGuard.decodeToken(token);
    await deps.WSGuard.canModify(userId, shoppingList.owner!.toString());

    await deps.ShoppingList.update({
      id,
      name,
      date,
      note,
    });

    return [];
  }
}
