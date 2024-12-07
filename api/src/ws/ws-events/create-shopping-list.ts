import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";
import { stringify } from "querystring";

export default class implements WSEvent<"CREATE_SHOPPING_LIST"> {
  public on = "CREATE_SHOPPING_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { token, name, date, note, items }: WS.Params.createShoppingList
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    const foodIds = (await deps.Foods.getList(items.map((x) => x.food))).reduce(
      (m, obj) => {
        m[obj._id.toString()] = obj.unit;
        return m;
      },
      {} as Record<string, string[]>
    );
    const newList = await deps.ShoppingList.create({
      name,
      date,
      note,
      owner: userId,
    });
    items = items
      .filter(
        (x) =>
          x.food !== undefined &&
          x.unit !== undefined &&
          x.food in foodIds &&
          foodIds[x.food].includes(x.unit)
      )
      .map((x) => ({ ...x, list: newList._id.toString() }));
    console.log(items);
    const SLids = await deps.ShoppingFood.createMany(items);
    return [];
  }
}
