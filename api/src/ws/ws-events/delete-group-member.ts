import { group } from "console";
import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_GROUP_MEMBER"> {
  public on = "DELETE_GROUP_MEMBER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { groupId, userId }: WS.Params.deleteGroupMember
  ) {
    const user = client.data.userId;
    const group = await deps.Groups.get(groupId);
    if (!group) throw new Error("Group not exists");
    const owner = group.owner!.toString();
    if (owner === userId) throw new Error("Can't remove owner");
    await deps.WSGuard.canModify(user, [owner, userId]);
    const doc = await deps.GroupMembers.getInvidual(userId, groupId);
    if (!doc) throw new Error("User not in group");
    await doc.deleteOne();
    return [
      {
        emit: this.on,
        to: [groupId],
        data: { id: groupId, user: userId },
      },
    ];
  }
}
