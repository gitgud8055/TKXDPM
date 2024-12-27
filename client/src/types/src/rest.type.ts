import { Entity } from "./entity.type";

export declare namespace REST {
  export interface To {
    "/login": {
      email: string;
      password: string;
    };
    "/register": {
      email: string;
      password: string;
      username: string;
      phone: string;
    };
    "/change-password": {
      email: string;
      oldPassword: string;
      newPassword: string;
    };
  }
  namespace From {
    export interface GET {
      "/api/users/entities": {
        groups: Entity.Group[];
        favs: Entity.FavDish[];
        dish: Entity.DishDetail[];
      };
    }
  }
}
