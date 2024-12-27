import { Entity } from "@gitgud/types";
import sharedShoppingList from "./models/shared-shopping-list";
import { Wrapper } from "./wrapper";

export class SharedShoppingLists extends Wrapper {
  public get(id: string) {
    return sharedShoppingList.findById(id);
  }
  public getDetail(id: string) {
    return this.get(id).populate(["list"]);
  }
  public getByGroupId(groupId: string) {
    return sharedShoppingList.find({ group: groupId });
  }
  public getByListId(listId: string) {
    return sharedShoppingList.find({ list: listId });
  }
  public create({ group, list }: Partial<Entity.SharedShoppingLists>) {
    return sharedShoppingList.create({ group, list });
  }
  public delete(id: string) {
    return sharedShoppingList.findByIdAndDelete(id);
  }
}
