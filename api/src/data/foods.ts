import food from "./models/food";
import { Wrapper } from "./wrapper";

export class Foods extends Wrapper {
  public get(id: string) {
    return food.findById(id);
  }
  public getList(id: (string | undefined)[]) {
    return food.find({ _id: { $in: id } });
  }
  public create({ name, image, unit, expired }) {
    return food.create({
      name,
      image,
      unit,
      expired,
    });
  }
}
