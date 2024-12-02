import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_GROUP"> {
  public on = "DELETE_GROUP" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupId }: WS.Params.deleteGroup
  ) {
    await deps.Groups.delete(groupId);
    return [];
  }
}
