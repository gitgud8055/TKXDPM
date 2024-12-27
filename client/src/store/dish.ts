import { Entity, Store } from "@gitgud/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { notInArray } from "./utils/filter";
import { getFavouriteDishes } from "./favs";

const dishSlice = createSlice({
  name: "dish",
  initialState: [] as Entity.Dish[],
  reducers: {
    fetched: (state, { payload }) => {
      return payload;
    },
    add: (state, { payload }) => {
      state.push(...notInArray(state, payload));
    },
    remove: (state, { payload }) => {
      const index = state.findIndex((dish) => dish._id === payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const actions = dishSlice.actions;
export default dishSlice.reducer;

export const getDish = (state: Store.AppState) => state.entities.dish;

export const selectFavDish = createSelector(
  [getFavouriteDishes, getDish],
  (favs, dish) => {
    const ids = favs.map((fav) => fav.dish);
    const setDish = new Map(dish.map((x) => [x._id, x]));
    return ids.map((id) => setDish.get(id)!);
  }
);

export const getDishById = createSelector(
  [getDish, (_, id) => id],
  (dish, id) => {
    return dish.filter((dish) => dish._id === id)[0];
  }
);
