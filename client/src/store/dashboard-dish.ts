import { Entity, Store } from "@gitgud/types";
import { createSlice } from "@reduxjs/toolkit";
import { notInArray } from "./utils/filter";

const dashboardDishSlice = createSlice({
  name: "dashboard",
  initialState: [] as Entity.DishDetail[],
  reducers: {
    fetched: (state, { payload }) => {
      return payload;
    },
    added: (state, { payload }) => {
      const m = {};
      payload.forEach((element) => {
        m[element._id] = element;
      });
      console.log(JSON.stringify(state));
      state = state.map((v) => {
        const cur = m[v._id];
        if (cur) {
          delete m[v._id];
          return cur;
        }
        return v;
      });
      state.push(...Object.values(m));
      return state;
    },
  },
});

export const actions = dashboardDishSlice.actions;
export default dashboardDishSlice.reducer;

export const getDashboardDish = (state: Store.AppState) =>
  state.entities.dashboard;
