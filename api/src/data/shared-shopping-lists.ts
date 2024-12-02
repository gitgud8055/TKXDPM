import sharedShoppingList from "./models/shared-shopping-list";
import { Wrapper } from "./wrapper";

export class SharedShoppingLists {
  public getByGroupId(groupId: string) {
    return sharedShoppingList.find({ group: groupId });
  }
  public getByListId(listId: string) {
    return sharedShoppingList.find({ list: listId });
  }
}
