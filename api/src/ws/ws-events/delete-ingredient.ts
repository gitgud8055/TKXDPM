import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_INGREDIENT"> {
  public on = "DELETE_INGREDIENT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, token }: WS.Params.deleteIngredient
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    await deps.WSGuard.isAdmin(userId);
    await deps.Foods.delete(id);
    return [];
  }
}
