import meal from "./models/meal";
import { Wrapper } from "./wrapper";

export class Meals extends Wrapper {
  public get(id: string) {
    return meal.findById(id);
  }
  public getByDate(date: Date) {
    return meal.find({ date: date });
  }
  public getDetail(id: string) {
    return this.getFull(id, ["dishes"]);
  }
}
