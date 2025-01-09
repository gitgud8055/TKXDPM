import { Entity, Store } from "@gitgud/types";
import { createSlice } from "@reduxjs/toolkit";
import { notInArray, resetArray } from "./utils/filter";
import { openDialog } from "./ui";
import { actions as api } from "./api";

export const favsSlice = createSlice({
  name: "favs",
  initialState: [] as Store.AppState["entities"]["favs"],
  reducers: {
    fetched: (state, { payload }) => {
      return payload;
    },
    add: (state, { payload }) => {
      state.push(payload);
      // state.push(...notInArray(state, payload));
    },
    delete: (state, { payload }) => {
      const index = state.findIndex((fav) => fav._id === payload);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const actions = favsSlice.actions;
export default favsSlice.reducer;

export const getFavouriteDishes = (state: Store.AppState) =>
  state.entities.favs;

export const deleteFav = (id: string) => (dispatch) => {
  dispatch(
    openDialog({
      content: "Remove this dish from your favourite list?",
      variant: "warning",
      dialogType: "swal",
      showCancelButton: true,
      callback: (result) => {
        if (result.isConfirmed) {
          dispatch(
            api.wsCallBegan({
              event: "DELETE_FAV_DISH",
              data: { dishId: id },
            })
          );
        }
      },
    })
  );
};

export const createFav = (id: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "CREATE_FAV_DISH",
      data: { dishId: id },
    })
  );
};
