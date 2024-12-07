import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_SHARED_LIST"> {
  public on = "DELETE_SHARED_LIST" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, token }: WS.Params.deleteSharedList
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    const shared = await deps.SharedShoppingLists.getDetail(id);
    if (!shared) throw new Error("Shared list not found");
    await deps.WSGuard.canModify(userId, shared.list!.owner.toString());
    await deps.SharedShoppingLists.delete(id);
    return [];
  }
}
