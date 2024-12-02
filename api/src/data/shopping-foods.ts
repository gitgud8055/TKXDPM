import shoppingFood from "./models/shopping-food";
import { Wrapper } from "./wrapper";

export class ShoppingFoods extends Wrapper {
  public get(id: string) {
    return shoppingFood.findById(id);
  }
  public create({ foodId, quantity, unit, location, note }) {
    return shoppingFood.create({
      food: foodId,
      quantity,
      unit,
      location,
      note,
    });
  }
}
