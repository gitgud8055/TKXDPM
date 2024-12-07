import { Entity } from "@gitgud/types";
import dish from "./models/dish";
import { Wrapper } from "./wrapper";

export class Dishes extends Wrapper {
  public get(id: string) {
    return dish.findById(id);
  }
  public getDetail(id: string) {
    return this.getFull(id, ["materials.food"]);
  }
  public create(options: Partial<Entity.Dish>) {
    return dish.create(options);
  }
  public update(options: Partial<Entity.Dish>) {
    const { id, ...data } = options;
    return dish.findByIdAndUpdate(id, { $set: data });
  }
  public delete(id: string) {
    return dish.findByIdAndDelete(id);
  }
}
