import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"DELETE_DISH_MAT"> {
  public on = "DELETE_DISH_MAT" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { id, materialId }: WS.Params.deleteDishMat
  ) {
    const userId = client.data.userId;
    const dish = await deps.Dishes.getDetail(id);
    if (!dish) throw new Error("Dish not found");
    await deps.WSGuard.canModify(userId, dish.owner!.toString());
    const material = dish.materials.id(materialId);
    if (!material) throw new Error("Material not found");
    dish.materials.pull(materialId);
    await dish.save();
    return [
      {
        emit: this.on,
        to: [client.id],
        data: { id, materialId },
      },
    ];
  }
}
