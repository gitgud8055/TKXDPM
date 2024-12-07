import favDish from "./models/fav-dish";
import { Wrapper } from "./wrapper";
import { Entity } from "@gitgud/types";

export class FavDishes extends Wrapper {
  public get(id: string) {
    return favDish.findById(id);
  }
  public create(options: Entity.FavDish) {
    return favDish.create(options);
  }
  public delete(options: Entity.FavDish) {
    return favDish.deleteOne(options);
  }
}
