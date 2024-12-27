import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_SHARED_LIST"> {
  public on = "CREATE_SHARED_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupId, shoppingListId }: WS.Params.createSharedList
  ) {
    const userId = client.data.userId;
    const group = await deps.Groups.get(groupId);
    if (!group) throw new Error("Group not exists");
    const list = await deps.ShoppingList.get(shoppingListId);
    if (!list) throw new Error("List not exists");
    await Promise.all([
      deps.WSGuard.userInGroup(userId, groupId),
      deps.WSGuard.canModify(userId, list.owner!.toString()),
    ]);
    await deps.SharedShoppingLists.create({
      group: groupId,
      list: shoppingListId,
    });
    return [];
  }
}
