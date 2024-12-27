export declare namespace Entity {
  export interface User {
    _id: string;
    email: string;
    password: string;
    username: string;
    phone: string;
    avatar: string;
    groups: string[];
    role: string;
  }
  export interface Group {
    _id: string;
    name: string;
    avatar: string;
    refrigerators: string[];
  }
  export interface ShoppingFood {
    _id: string;
    food: string;
    list: string;
    quantity: number;
    unit: string;
    note: string;
    bought: string;
  }
  export interface ShoppingList {
    _id: string;
    name: string;
    owner: string;
    date: Date;
    note: string;
    items: string[];
  }
  export interface Dish {
    _id: string;
    name: string;
    images: string[];
    materials: Entity.FoodDetail[];
    information: string;
    owner: string;
  }
  export interface DishDetail {
    _id: string;
    name: string;
    images: string[];
    materials: Entity.FoodDetail[];
    information: string;
    owner: Entity.User;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface FavDish {
    _id: string;
    user: string;
    dish: string;
  }
  export interface FavDishDetail {
    _id: string;
    user: string;
    dish: Entity.DishDetail;
  }
  export interface SharedShoppingLists {
    _id: string;
    group: string;
    list: string;
  }
  export interface FoodDetail {
    _id: string;
    food: Entity.Food;
    unit: string;
    quantity: number;
  }
  export interface Food {
    _id: string;
    name: string;
    image: string;
    unit: string[];
    duration: number;
  }
  export interface Ingredient {
    _id: string;
    name: string;
    image: string;
    unit: string;
    duration: number;
  }
  export interface Meal {
    _id: string;
    date: Date;
    images: string[];
    name: string;
    dishes: string[];
  }
  export interface RefrigeratorFood {
    _id: string;
    food: string;
    quantity: number;
    unit: string;
    note: string;
    expired: Date;
  }
}
