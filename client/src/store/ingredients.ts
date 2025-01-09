import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Store } from "@gitgud/types";

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: [] as Store.AppState["entities"]["ingredients"],
  reducers: {
    fetched: (state, { payload }) => {
      return payload;
    },
  },
});

export const actions = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const getIngredients = (store: Store.AppState) =>
  store.entities.ingredients;
export const getIngredientsSpecial = createSelector(
  getIngredients,
  (ingredients) => {
    return {
      names: ingredients.map((x) => x.name),
      data: new Map(ingredients.map((x) => [x.name, x])),
    };
  }
);
