import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class CreateGroupEvent implements WSEvent<"CREATE_GROUP"> {
  public on = "CREATE_GROUP" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupName, groupAvatar }: WS.Params.createGroup
  ) {
    await deps.Groups.create({
      name: groupName,
      avatar: groupAvatar,
      owner: client.data.userId,
    });
    return [];
  }
}
