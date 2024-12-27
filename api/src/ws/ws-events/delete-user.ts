import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_USER"> {
  public on = "DELETE_USER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id }: WS.Params.deleteUser
  ) {
    const userId = client.data.userId;
    await deps.WSGuard.canModify(userId, id);
    await deps.User.delete(id);
    return [];
  }
}
