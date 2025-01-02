import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_GROUP_MEMBER"> {
  public on = "CREATE_GROUP_MEMBER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupId, userId }: WS.Params.createGroupMember
  ) {
    const group = await deps.Groups.get(groupId);
    if (!group) throw new Error("Group not exists");
    if (userId === group.owner?.toString())
      throw new Error("Owner can't leave group");
    const user = client.data.userId;
    await Promise.all([
      deps.WSGuard.canModify(user, group.owner!.toString()),
      deps.WSGuard.userNotInGroup(userId, groupId),
    ]);
    await deps.GroupMembers.create({ group: groupId, user: userId });
    return [];
  }
}
