import { Entity } from "@gitgud/types";
import shoppingList from "./models/shopping-list";
import { Wrapper } from "./wrapper";

export class ShoppingList extends Wrapper {
  public get(id: string) {
    return shoppingList.findById(id);
  }
  public async getDetail(id: string) {
    const [data, items] = await Promise.all([
      this.get(id),
      deps.ShoppingFood.getList(id),
    ]);
    return { ...data?.toObject(), items };
  }
  public create({
    name,
    owner,
    date,
    note,
    items,
  }: Partial<Entity.ShoppingList>) {
    return shoppingList.create({
      name,
      owner,
      date,
      note,
      items,
    });
  }
  public update({ _id, name, date, note }: Partial<Entity.ShoppingList>) {
    return shoppingList.findByIdAndUpdate(_id, { $set: { name, date, note } });
  }
  public delete(id: string) {
    return shoppingList.findByIdAndDelete(id);
  }
}
