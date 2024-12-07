import { Entity } from "./entity.type";

export declare namespace WS {
  export interface To {
    TEST: Params.test;
    CREATE_DISH: Params.createDish;
    CREATE_FAV_DISH: Params.createFavDish;
    CREATE_GROUP: Params.createGroup;
    CREATE_REF_FOOD: Params.createRefFood;
    CREATE_SHOPPING_LIST: Params.createShoppingList;
    DELETE_DISH: Params.deleteDish;
    DELETE_FAV_DISH: Params.deleteFavDish;
    DELETE_GROUP: Params.deleteGroup;
    DELETE_REF_FOOD: Params.deleteRefFood;
    DELETE_SHOPPING_LIST: Params.deleteShoppingList;
    DELETE_USER: Params.deleteUser;
    UPDATE_DISH: Params.updateDish;
    UPDATE_GROUP: Params.updateGroup;
    UPDATE_REF_FOOD: Params.updateRefFood;
    UPDATE_SHOPPING_FOOD: Params.updateShoppingFood;
    UPDATE_SHOPPING_LIST: Params.updateShoppingList;
    UPDATE_USER: Params.updateUser;
    CREATE_SHARED_LIST: Params.createSharedList;
    DELETE_SHARED_LIST: Params.deleteSharedList;
  }

  export interface From {
    TEST: {};
  }

  export namespace Params {
    export interface test {
      message: string;
    }
    export interface createGroup {
      groupName: string;
      groupAvatar: string;
    }
    export interface updateGroup {
      groupId: string;
      groupName: string;
      groupAvatar: string;
    }
    export interface deleteGroup {
      groupId: string;
    }
    export interface createRefFood {
      foodId: string;
      quantity: number;
      unit: string;
      note: string;
    }
    export interface updateRefFood {
      id: string;
      quantity: number;
      note: string;
    }
    export interface deleteRefFood {
      id: string;
    }
    export interface updateUser {
      token: string;
      username: string;
      avatar: string;
      phone: string;
    }
    export interface createShoppingList {
      token: string;
      name: string;
      date: Date;
      note: string;
      items: Partial<Entity.ShoppingFood>[];
    }
    export interface updateShoppingFood {
      id: string;
      quantity: number;
      note: string;
    }
    export interface createDish {
      name: string;
      images: string[];
      materials: Entity.FoodDetail[];
      information: string;
      token: string;
    }
    export interface createFavDish {
      token: string;
      dishId: string;
    }
    export interface deleteFavDish {
      token: string;
      dishId: string;
    }
    export interface deleteUser {
      token: string;
      id: string;
    }
    export interface updateDish {
      id: string;
      name: string;
      images: string[];
      information: string;
      token: string;
    }
    export interface deleteDish {
      id: string;
      token: string;
    }
    export interface deleteShoppingList {
      id: string;
      token: string;
    }
    export interface updateShoppingList {
      id: string;
      name: string;
      date: Date;
      note: string;
      token: string;
    }
    export interface createSharedList {
      groupId: string;
      shoppingListId: string;
      token: string;
    }
    export interface deleteSharedList {
      id: string;
      token: string;
    }
  }
}
