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
    CREATE_INGREDIENT: Params.createIngredient;
    UPDATE_INGREDIENT: Params.updateIngredient;
    DELETE_INGREDIENT: Params.deleteIngredient;
    CREATE_MEAL: Params.createMeal;
    DELETE_MEAL: Params.deleteMeal;
    UPDATE_DISH_MAT: Params.updateDishMat;
    DELETE_DISH_MAT: Params.deleteDishMat;
    ADD_DISH_MAT: Params.addDishMat;
    DELETE_DISH_IMG: Params.deleteDishImg;
    CREATE_GROUP_MEMBER: Params.createGroupMember;
    DELETE_GROUP_MEMBER: Params.deleteGroupMember;
    DELEGATE_MEMBER: Params.delegateMember;
    ADD_MEMBER: Params.addMember;
    ADD_SHOPPING_FOOD: Params.addShoppingFood;
    DELETE_SHOPPING_FOOD: Params.deleteShoppingFood;
    ADD_FOOD: Params.addFood;
  }

  export interface From {
    TEST: {};
    DELETE_FAV_DISH: Args.deleteFavDish;
    UPDATE_DISH_MAT: Args.updateDishMat;
    DELETE_DISH_MAT: Args.deleteDishMat;
    DELETE_DISH_IMG: Args.deleteDishImg;
    UPDATE_DISH: Args.updateDish;
    DELEGATE_MEMBER: Args.delegateMember;
    DELETE_GROUP_MEMBER: Args.deleteGroupMember;
    ADD_DISH_MAT: Args.addDishMat;
    UPDATE_USER: Args.updateUser;
    CREATE_FAV_DISH: Args.createFavDish;
    ADD_MEMBER: Args.addMember;
    CREATE_DISH: Args.createDish;
  }

  export namespace Params {
    export interface test {
      message: string;
    }
    export interface createGroup {
      groupName: string;
      groupAvatar: string;
      description: string;
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
      username: string;
      avatar: string;
      // phone: string;
    }
    export interface createShoppingList {
      name: string;
      date: Date;
      note: string;
      // items: Partial<Entity.ShoppingFood>[];
    }
    export interface updateShoppingFood {
      list: string;
      id: string;
      quantity: number;
      note: string;
      unit: string;
    }
    export interface createDish {
      name: string;
      images: string[];
      materials: Entity.FoodDetail[];
      information: string;
    }
    export interface createFavDish {
      dishId: string;
    }
    export interface deleteFavDish {
      dishId: string;
    }
    export interface deleteUser {
      id: string;
    }
    export interface updateDish {
      id: string;
      name: string;
      images: string[];
      information: string;
    }
    export interface deleteDish {
      id: string;
    }
    export interface deleteShoppingList {
      id: string;
    }
    export interface updateShoppingList {
      id: string;
      name: string;
      date: Date;
      note: string;
    }
    export interface createSharedList {
      groupId: string;
      shoppingListId: string;
    }
    export interface deleteSharedList {
      id: string;
      groupId: string;
    }
    export interface createIngredient {
      name: string;
      image: string;
      unit: string;
      duration: number;
    }
    export interface updateIngredient {
      id: string;
      name: string;
      image: string;
      unit: string;
      duration: number;
    }
    export interface deleteIngredient {
      id: string;
    }
    export interface createMeal {
      name: string;
      images: string[];
      dishIds: string[];
      date: Date;
    }
    export interface deleteMeal {
      id: string;
    }
    export interface updateDishMat {
      id: string;
      material: Entity.FoodDetail;
    }
    export interface deleteDishMat {
      id: string;
      materialId: string;
    }
    export interface addDishMat {
      id: string;
      material: {
        food: string;
        quantity: number;
        unit: string;
      };
      rowId: string;
    }
    export interface deleteDishImg {
      id: string;
      index: number;
      image: string;
    }
    export interface createGroupMember {
      groupId: string;
      userId: string;
    }
    export interface deleteGroupMember {
      groupId: string;
      userId: string;
    }
    export interface delegateMember {
      id: string;
      userId: string;
    }
    export interface addMember {
      groupId: string;
      userId: string;
    }
    export interface addShoppingFood {
      list: string;
      id: string;
      quantity: number;
      unit: string;
      note: string;
      name: string;
    }
    export interface deleteShoppingFood {
      list: string;
      id: string;
    }
    export interface addFood {
      name: string;
      image: string;
      unit: string[];
      duration: number;
    }
  }

  export namespace Args {
    export interface deleteFavDish {
      id: string;
    }
    export interface updateDishMat {
      id: string;
      material: Entity.FoodDetail;
    }
    export interface deleteDishMat {
      id: string;
      materialId: string;
    }
    export interface deleteDishImg {
      id: string;
      index: string;
    }
    export interface updateDish {
      id: string;
      name: string;
      images: string[];
      information: string;
    }
    export interface delegateMember {
      id: string;
      user: Entity.User;
    }
    export interface deleteGroupMember {
      id: string;
      user: string;
    }
    export interface addDishMat {
      id: string;
      material: Entity.FoodDetail;
    }
    export interface updateUser {
      username: string;
      avatar: string;
    }
    export interface createFavDish {
      dish: Entity.DishDetail;
      fav: Entity.FavDish;
    }
    export interface addMember {
      id: string;
      user: Entity.User;
    }
    export interface createDish {
      data: Entity.DishDetail;
      fav: Entity.FavDish;
    }
  }
}
