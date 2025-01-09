import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class CreateGroupEvent implements WSEvent<"CREATE_GROUP"> {
  public on = "CREATE_GROUP" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupName, groupAvatar, description }: WS.Params.createGroup
  ) {
    const group = await deps.Groups.create({
      name: groupName,
      avatar: groupAvatar,
      owner: client.data.userId,
      description,
    });
    await deps.GroupMembers.create({
      user: client.data.userId,
      group: group._id.toString(),
    });
    return [];
  }
}
