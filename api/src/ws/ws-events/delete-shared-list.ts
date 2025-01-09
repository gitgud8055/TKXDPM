import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_SHARED_LIST"> {
  public on = "DELETE_SHARED_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, groupId }: WS.Params.deleteSharedList
  ) {
    const userId = client.data.userId;
    const shared = await deps.SharedShoppingLists.getInvidual({
      group: groupId,
      list: id,
    });
    if (!shared) throw new Error("Shared list not found");
    console.log(shared);
    await Promise.all([
      deps.WSGuard.canModify(userId, shared.list!.owner.toString()),
      deps.WSGuard.userInGroup(userId, shared.group!.toString()),
    ]);
    await shared.deleteOne();
    return [];
  }
}
