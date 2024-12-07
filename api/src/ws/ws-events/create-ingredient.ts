import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_INGREDIENT"> {
  public on = "CREATE_INGREDIENT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { token, name, image, unit, duration }: WS.Params.createIngredient
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    await deps.WSGuard.isAdmin(userId);

    await deps.Foods.create({
      name,
      image,
      unit,
      duration,
    });

    return [];
  }
}
