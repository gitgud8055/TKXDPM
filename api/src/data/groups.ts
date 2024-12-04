import { Entity } from "@gitgud/types";
import group from "./models/group";
import { Wrapper } from "./wrapper";

export class Groups extends Wrapper {
  public get(id: string) {
    return group.findById(id);
  }
  public async getWithRef(id: string) {
    const data = await this.get(id)
      .populate({
        path: "refrigerators",
        populate: { path: "food" },
      })
      .lean();
    data.refrigerators = data.refrigerators.map((item) => {
      item.name = item.food.name;
      item.image = item.food.image;
      item.food = undefined;
      return item;
    });
    return data;
  }
  public create(options: Partial<Entity.Group>) {
    return group.create(options);
  }
  public update(options: Partial<Entity.Group>) {
    const { id, ...data } = options;
    return group.findByIdAndUpdate(id, { $set: data });
  }
  public delete(id: string) {
    return group.findByIdAndDelete(id);
  }
}
