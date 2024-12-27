import { Entity } from "@gitgud/types";
import dish from "./models/dish";
import { Wrapper } from "./wrapper";
import { diffieHellman } from "crypto";

export class Dishes extends Wrapper {
  public get(id: string) {
    return dish.findById(id);
  }
  public getDetail(id: string) {
    return this.getFull(id, ["materials.food"]);
  }
  public getList(id: (string | undefined)[]) {
    return dish.find({ _id: { $in: id } }).populate("materials.food owner");
  }
  public create(options: Partial<Entity.Dish>) {
    return dish.create(options);
  }
  public update(options: Partial<Entity.Dish>) {
    const { _id: id, ...data } = options;
    return dish.findByIdAndUpdate(id, { $set: data });
  }
  public delete(id: string) {
    return dish.findByIdAndDelete(id);
  }
}
