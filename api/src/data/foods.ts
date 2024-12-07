import { Entity } from "@gitgud/types";
import food from "./models/food";
import { Wrapper } from "./wrapper";

export class Foods extends Wrapper {
  public get(id: string) {
    return food.findById(id);
  }
  public getList(id: (string | undefined)[]) {
    return food.find({ _id: { $in: id } });
  }
  public create({ name, image, unit, duration }: Partial<Entity.Ingredient>) {
    return food.create({
      name,
      image,
      unit,
      duration,
    });
  }
  public update({
    id,
    name,
    image,
    unit,
    duration,
  }: Partial<Entity.Ingredient>) {
    return food.findByIdAndUpdate(id, {
      $set: { name, image, unit, duration },
    });
  }
  public delete(id: string) {
    return food.findByIdAndDelete(id);
  }
}
