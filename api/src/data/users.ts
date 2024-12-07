import { Entity, REST } from "@gitgud/types";
import user from "./models/user";
import { Wrapper } from "./wrapper";
import jwt from "jsonwebtoken";

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
  public update(options: Partial<Entity.User>) {
    const { id, ...data } = options;
    return user.findByIdAndUpdate(id, { $set: data });
  }
  public delete(id: string) {
    return user.findByIdAndDelete(id);
  }
  public createToken(data: any, expired = true) {
    return jwt.sign(data, process.env.JWT_KEY, {
      expiresIn: expired ? "7d" : undefined,
    });
  }
  public decodeToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_KEY) as { id: string };
    return decoded.id;
  }
}
