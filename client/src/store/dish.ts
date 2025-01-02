import { Entity, Store } from "@gitgud/types";
import { createSelector, createSlice, current } from "@reduxjs/toolkit";
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
    update: (state, { payload }) => {
      const idx = state.findIndex((dish) => dish._id === payload.id);
      if (idx !== -1) {
        state[idx] = {
          ...state[idx],
          ...payload,
          images: state[idx].images.concat(payload.images || []),
        };
      }
    },
    removeImg: (state, { payload }) => {
      const index = state.findIndex((dish) => dish._id === payload.id);
      if (index !== -1) {
        state[index].images.splice(payload.index, 1);
      }
    },
    updateMat: (state, { payload }) => {
      const { id, material } = payload;
      const idx = state.findIndex((dish) => dish._id === id);
      if (idx !== -1) {
        const index = state[idx].materials.findIndex(
          (x) => x._id === material._id
        );

        if (index !== -1) {
          const current = state[idx].materials[index];
          current.quantity = material.quantity;
          current.unit = material.unit;
        }
      }
    },
    removeMat: (state, { payload }) => {
      const idx = state.findIndex((dish) => dish._id === payload.id);
      if (idx !== -1) {
        state[idx].materials = state[idx].materials.filter(
          (x) => x._id !== payload.materialId
        );
      }
    },
  },
});

export const actions = dishSlice.actions;
export default dishSlice.reducer;

export const getDish = (state: Store.AppState) => state.entities.dish;

export const selectFavDish = createSelector(
  [
    getFavouriteDishes,
    createSelector(getDish, (dishes) => {
      return new Map(dishes.map((x) => [x._id, x]));
    }),
  ],
  (favs, setDish) => {
    const ids = favs.map((fav) => fav.dish);
    return ids.map((id) => setDish.get(id)!);
  }
);

export const getDishById = createSelector(
  [getDish, (_, id) => id],
  (dish, id) => {
    return dish.filter((dish) => dish._id === id)[0];
  }
);
