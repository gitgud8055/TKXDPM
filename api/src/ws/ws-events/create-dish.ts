import { WSEvent } from "../ws-types";
import { Socket } from "socket.io";
import { Websocket } from "../websocket";
import { WS } from "@gitgud/types";

export default class implements WSEvent<"CREATE_DISH"> {
  public on = "CREATE_DISH" as const;

  public async invoke(
    ws: Websocket,
    client: Socket,
    { name, images, materials, information, token }: WS.Params.createDish
  ) {
    const userId = deps.WSGuard.decodeToken(token);
    const foodIds = (
      await deps.Foods.getList(materials.map((x) => x.food))
    ).reduce((m, obj) => {
      m[obj._id.toString()] = obj.unit;
      return m;
    }, {} as Record<string, string[]>);
    materials = materials.filter(
      (x) =>
        x.food !== undefined &&
        x.unit !== undefined &&
        x.food in foodIds &&
        foodIds[x.food].includes(x.unit)
    );
    const dish = await deps.Dishes.create({
      name,
      images,
      materials,
      information,
      owner: userId,
    });

    return [];
  }
}
