import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_USER"> {
  public on = "UPDATE_USER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { username, avatar }: WS.Params.updateUser
  ) {
    const _id = client.data.userId;
    console.log(_id, username, avatar);
    const updatedUser = await deps.User.update({
      _id,
      username,
      avatar,
    });
    return [
      {
        emit: this.on,
        to: [_id],
        data: {
          username,
          avatar,
        },
      },
    ];
  }
}
