import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELEGATE_MEMBER"> {
  public on = "DELEGATE_MEMBER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, userId }: WS.Params.delegateMember
  ) {
    const user = client.data.userId;
    console.log("token: ", user, client.id);
    const group = await deps.Groups.get(id);
    if (!group) throw new Error("Group not exists");
    if (user === userId) throw new Error("You can't delegate yourself");
    // Check if current user can modify the group
    await Promise.all([
      deps.WSGuard.canModify(user, group.owner!.toString()),
      deps.WSGuard.userInGroup(userId, id),
    ]);
    group.owner = userId;
    group.save();
    // Update the group with the new owner
    const data = await deps.User.secure(await deps.User.get(userId));

    return [
      {
        emit: this.on,
        to: [id],
        data: { id, user: data },
      },
    ];
  }
}
