import { group } from "console";
import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"ADD_MEMBER"> {
  public on = "ADD_MEMBER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { userId, groupId }: WS.Params.addMember
  ) {
    const user = client.data.userId;
    const group = await deps.Groups.get(groupId);
    if (!group) throw new Error("Group not exists");
    await deps.WSGuard.canModify(user, group.owner!.toString());
    await deps.WSGuard.userNotInGroup(userId, groupId);
    await deps.GroupMembers.create({ user: userId, group: groupId });
    const newMember = await deps.User.get(userId);
    return [
      {
        emit: this.on,
        to: [groupId],
        data: {
          id: groupId,
          user: newMember,
        },
      },
    ];
  }
}
