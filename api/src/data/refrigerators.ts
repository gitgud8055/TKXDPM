import refrigerator from "./models/refrigerator";
import { Wrapper } from "./wrapper";

export class Refrigerators extends Wrapper {
  public get(id: string) {
    return refrigerator.findById(id);
  }
  public create() {
    return refrigerator.create({
      foods: [],
    });
  }
  public async getDetail(id: string) {
    const data = await this.get(id)
      .populate({
        path: "foods",
        populate: { path: "food" },
      })
      .lean();
    data.foods = data.foods.map((item) => {
      item.name = item.food.name;
      item.image = item.food.image;
      item.food = undefined;
      item.location = undefined;
      return item;
    });
    return data;
  }
}
