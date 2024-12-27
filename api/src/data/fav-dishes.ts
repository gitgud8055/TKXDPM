import favDish from "./models/fav-dish";
import { Wrapper } from "./wrapper";
import { Entity } from "@gitgud/types";

export class FavDishes extends Wrapper {
  public get(id: string) {
    return favDish.findById(id);
  }
  public create(options: Partial<Entity.FavDish>) {
    return favDish.create(options);
  }
  public delete(options: Partial<Entity.FavDish>) {
    return favDish.findOneAndDelete(options);
  }
  public getAllFromUser(id: string) {
    return favDish.find({ user: id }).populate({
      path: "dish",
      populate: [
        {
          path: "materials.food",
        },
        {
          path: "owner",
          select: "username avatar",
        },
      ],
    });
  }
  public getFromUser(id: string) {
    return favDish.find({ user: id });
  }
}
