import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_USER"> {
  public on = "UPDATE_USER" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { token, username, avatar, phone }: WS.Params.updateUser
  ) {
    const id = deps.WSGuard.decodeToken(token);
    const updatedUser = await deps.User.update({
      id,
      username,
      avatar,
      phone,
    });
    return [];
  }
}