import { Store } from "@gitgud/types";
import { createSlice } from "@reduxjs/toolkit";

export const metaSlice = createSlice({
  name: "meta",
  initialState: {
    hasListenedToWS: false,
    fetchedEntities: false,
  } as Store.AppState["meta"],
  reducers: {
    fetchedEntities: (state) => {
      state.fetchedEntities = true;
    },
    listenedToWS: (state) => {
      state.hasListenedToWS = true;
    },
    offWS: (state) => {
      state.hasListenedToWS = false;
    },
    reFetchEntities: (state) => {
      state.fetchedEntities = false;
    },
  },
});

export const actions = metaSlice.actions;
export default metaSlice.reducer;

export const getHasListenedToWS = (state) => state.meta.hasListenedToWS;
export const getFetchedEntities = (state) => state.meta.fetchedEntities;
