import { Entity } from "@gitgud/types";
import refrigeratorFood from "./models/refrigerator-food";
import { Wrapper } from "./wrapper";

export class RefrigeratorFoods extends Wrapper {
  public get(id: string) {
    return refrigeratorFood.findById(id);
  }
  public async getDetail(id: string) {
    return this.getFull(id, ["food"]);
  }
  public create({
    food,
    quantity,
    unit,
    note,
  }: Partial<Entity.RefrigeratorFood>) {
    return refrigeratorFood.create({
      food,
      quantity,
      unit,
      note,
    });
  }
  public update({ _id, quantity, note }: Partial<Entity.RefrigeratorFood>) {
    return refrigeratorFood.findByIdAndUpdate(_id, {
      $set: { quantity, note },
    });
  }
  public delete(id: string) {
    return refrigeratorFood.findByIdAndDelete(id);
  }
}
