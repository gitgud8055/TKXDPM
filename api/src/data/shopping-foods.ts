import { Entity } from "@gitgud/types";
import shoppingFood from "./models/shopping-food";
import { Wrapper } from "./wrapper";

export class ShoppingFoods extends Wrapper {
  public get(id: string) {
    return shoppingFood.findById(id);
  }
  public getList(listId: string) {
    return shoppingFood.find({ list: listId });
  }
  public create({
    food,
    list,
    quantity,
    unit,
    note,
  }: Partial<Entity.ShoppingFood>) {
    return shoppingFood.create({
      food,
      list,
      quantity,
      unit,
      note,
    });
  }
  public delete(id: string) {
    return shoppingFood.findByIdAndDelete(id);
  }
  public createMany(items: Partial<Entity.ShoppingFood>[]) {
    return shoppingFood.insertMany(items);
  }
  public update({ _id, quantity, note, unit }: Partial<Entity.ShoppingFood>) {
    return shoppingFood.findByIdAndUpdate(_id, {
      $set: { quantity, note, unit },
    });
  }
  public deleteList(listid: string) {
    return shoppingFood.deleteMany({ list: listid });
  }
}
