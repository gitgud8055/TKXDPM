import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_INGREDIENT"> {
  public on = "UPDATE_INGREDIENT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, name, image, unit, duration, token }: WS.Params.updateIngredient
  ) {
    const ingredient = await deps.Foods.get(id);
    if (!ingredient) throw new Error("Ingredient not found");

    const userId = deps.WSGuard.decodeToken(token);
    await deps.WSGuard.isAdmin(userId);

    await deps.Foods.update({
      id,
      name,
      image,
      unit,
      duration,
    });

    return [];
  }
}
