import dish from "./models/dish";
import { Wrapper } from "./wrapper";

export class Dishes extends Wrapper {
  public get(id: string) {
    return dish.findById(id);
  }
  public getDetail(id: string) {
    return this.getFull(id, ["materials"]);
  }
}
