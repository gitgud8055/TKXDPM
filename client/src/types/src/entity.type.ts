export declare namespace Entity {
  export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
    phone: string;
    avatar: string;
    groups: string[];
    role: string;
  }
  export interface Group {
    id: string;
    name: string;
    avatar: string;
    refrigerators: string[];
  }
  export interface ShoppingFood {
    id: string;
    food: string;
    quantity: number;
    unit: string;
    note: string;
    bought: string;
  }
  export interface ShoppingList {
    id: string;
    name: string;
    owner: string;
    date: Date;
    note: string;
    items: string[];
  }
  export interface Dish {
    id: string;
    name: string;
    images: string[];
    materials: Entity.FoodDetail[];
    information: string;
    owner: string;
  }
  export interface FavDish {
    user: string;
    dish: string;
  }
  export interface SharedShoppingLists {
    group: string;
    list: string;
  }
  export interface FoodDetail {
    food: string;
    unit: string;
    quantity: number;
  }
}
