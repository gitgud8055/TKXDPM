import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_GROUP"> {
  public on = "UPDATE_GROUP" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupId, groupName, groupAvatar }: WS.Params.updateGroup
  ) {
    const group = await deps.Groups.update({
      _id: groupId,
      name: groupName,
      avatar: groupAvatar,
    });
    return [];
  }
}
