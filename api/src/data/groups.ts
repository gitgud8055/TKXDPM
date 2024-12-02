import group from "./models/group";
import { Wrapper } from "./wrapper";

export class Groups extends Wrapper {
  public get(id: string) {
    return group.findById(id);
  }
  public getWithRef(id: string) {
    return this.getFull(id, ["refrigerators"]);
  }
  public create(options) {
    return group.create(options);
  }
  public update(options) {
    const { id, ...data } = options;
    return group.findByIdAndUpdate(id, data);
  }
  public delete(id: string) {
    return group.findByIdAndDelete(id);
  }
}
