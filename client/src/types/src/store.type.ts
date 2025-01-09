import { Entity } from "./entity.type";

export namespace Store {
  export interface AppState {
    auth: {
      loading: boolean;
      user?: Partial<Entity.User>;
    };
    ui: {
      sidebarOpened: boolean;
    };
    meta: {
      hasListenedToWS: boolean;
      fetchedEntities: boolean;
    };
    entities: {
      groups: Entity.Group[];
      favs: Entity.FavDish[];
      dish: Entity.DishDetail[];
      member: Record<string, Entity.User[]>;
      ingredients: Entity.Ingredient[];
      dashboard: Entity.DishDetail[];
    };
  }
}
