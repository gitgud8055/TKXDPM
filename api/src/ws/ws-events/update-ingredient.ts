import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"UPDATE_INGREDIENT"> {
  public on = "UPDATE_INGREDIENT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, name, image, unit, duration }: WS.Params.updateIngredient
  ) {
    const ingredient = await deps.Foods.get(id);
    if (!ingredient) throw new Error("Ingredient not found");

    const userId = client.data.userId;
    await deps.WSGuard.isAdmin(userId);

    await deps.Foods.update({
      _id: id,
      name,
      image,
      unit,
      duration,
    });

    return [];
  }
}
