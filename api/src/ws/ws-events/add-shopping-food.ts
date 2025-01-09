import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"ADD_SHOPPING_FOOD"> {
  public on = "ADD_SHOPPING_FOOD" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { quantity, note, unit, name, list }: WS.Params.addShoppingFood
  ) {
    const userId = client.data.userId;
    const shoppingList = await deps.ShoppingList.get(list);
    if (!shoppingList) throw new Error("Shopping list not found");
    await deps.WSGuard.canModify(userId, shoppingList.owner!.toString());
    const food = await deps.Foods.getByName(name);
    if (!food) throw new Error("Food not found");
    const shoppingFood = await deps.ShoppingFood.create({
      quantity,
      note,
      unit,
      list,
      food: food._id.toString(),
    });

    return [];
  }
}
