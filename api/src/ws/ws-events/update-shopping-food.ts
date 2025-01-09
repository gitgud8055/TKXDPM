import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_SHOPPING_FOOD"> {
  public on = "UPDATE_SHOPPING_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, quantity, note, unit, list }: WS.Params.updateShoppingFood
  ) {
    const userId = client.data.userId;
    const flist = await deps.ShoppingList.get(list);
    if (!flist) throw new Error("Shopping list not found");
    await deps.WSGuard.canModify(userId, flist.owner!.toString());
    const shoppingFood = await deps.ShoppingFood.update({
      _id: id,
      quantity,
      note,
      unit,
    });

    return [];
  }
}
