import favDish from "./models/fav-dish";
import { Wrapper } from "./wrapper";

export class FavDishes extends Wrapper {
  public get(id: string) {
    return favDish.findById(id);
  }
}
