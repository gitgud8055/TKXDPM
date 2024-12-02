import shoppingList from "./models/shopping-list";
import { Wrapper } from "./wrapper";

export class ShoppingList extends Wrapper {
  public get(id: string) {
    return shoppingList.findById(id);
  }
  public async getDetail(id: string) {
    const data = await this.get(id)
      .populate({
        path: "items",
        populate: { path: "food" },
      })
      .lean();
    data.items = data.items.map((item) => {
      item.name = item.food.name;
      item.image = item.food.image;
      item.food = undefined;
      return item;
    });
    return data;
  }
  public create({ name, owner, date, note, items }) {
    return shoppingList.create({
      name,
      owner,
      date,
      note,
      items,
    });
  }
}
