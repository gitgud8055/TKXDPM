import { Entity } from "@gitgud/types";
import shoppingFood from "./models/shopping-food";
import { Wrapper } from "./wrapper";

export class ShoppingFoods extends Wrapper {
  public get(id: string) {
    return shoppingFood.findById(id);
  }
  public create({ foodId, quantity, unit, note }) {
    return shoppingFood.create({
      food: foodId,
      quantity,
      unit,
      note,
    });
  }
  public createMany(items: Partial<Entity.ShoppingFood>[]) {
    return shoppingFood.insertMany(items);
  }
  public update({ id, quantity, note }: Partial<Entity.ShoppingFood>) {
    return shoppingFood.findByIdAndUpdate(id, { $set: { quantity, note } });
  }
  public deleteList(id: string[]) {
    return shoppingFood.deleteMany({ _id: { $in: id } });
  }
}
