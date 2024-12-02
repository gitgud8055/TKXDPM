import { FavDishes } from "./../data/fav-dishes";
import { RefrigeratorFoods } from "../data/refrigerator-foods";
import { Meals } from "./../data/meals";
import { ShoppingFoods } from "../data/shopping-foods";
import { ShoppingList } from "../data/shopping-lists";
import { SharedShoppingLists } from "./../data/shared-shopping-lists";
import { Groups } from "../data/groups";
import { User } from "../data/users";
import { Foods } from "../data/foods";
import { REST } from "../rest/server";
import { Dishes } from "../data/dishes";
import { Websocket } from "../ws/websocket";

export interface Deps {
  User: User;
  REST: REST;
  Websocket: Websocket;
  Groups: Groups;
  SharedShoppingLists: SharedShoppingLists;
  ShoppingList: ShoppingList;
  ShoppingFood: ShoppingFoods;
  Foods: Foods;
  Dishes: Dishes;
  Meals: Meals;
  RefrigeratorFoods: RefrigeratorFoods;
  FavDishes: FavDishes;
}

const deps = {
  User: new User(),
  REST: new REST(),
  Websocket: new Websocket(),
  Groups: new Groups(),
  SharedShoppingLists: new SharedShoppingLists(),
  ShoppingList: new ShoppingList(),
  ShoppingFood: new ShoppingFoods(),
  Foods: new Foods(),
  Dishes: new Dishes(),
  Meals: new Meals(),
  RefrigeratorFoods: new RefrigeratorFoods(),
  FavDishes: new FavDishes(),
};

global.deps = deps;
