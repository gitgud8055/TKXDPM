import { REST } from "@gitgud/types";
import user from "./models/user";
import { Wrapper } from "./wrapper";

export class User extends Wrapper {
  public get(id: string) {
    return user.findById(id);
  }
  public getByEmail(email: string) {
    return user.findOne({ email });
  }
  public create({ email, password, username, phone }: REST.To["/register"]) {
    return user.create({
      email,
      password,
      username,
      phone,
      avatar: "",
      role: "user",
      groups: [],
    });
  }
  public secure(user: any) {
    return this.exclude(user, ["password", "groups", "_id", "role"]);
  }
}
