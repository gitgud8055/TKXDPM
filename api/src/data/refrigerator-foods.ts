import refrigeratorFood from "./models/refrigerator-food";
import { Wrapper } from "./wrapper";

export class RefrigeratorFoods extends Wrapper {
  public get(id: string) {
    return refrigeratorFood.findById(id);
  }
  public async getDetail(id: string) {
    return this.getFull(id, ["food"]);
  }
  public create({ food, quantity, unit, note }) {
    return refrigeratorFood.create({
      food,
      quantity,
      unit,
      note,
    });
  }
}
