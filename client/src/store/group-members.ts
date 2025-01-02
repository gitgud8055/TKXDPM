import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Entity, Store } from "@gitgud/types";

const add = (state, element) => {
  if (!(element.group in state)) state[element.group] = [element.user];
  else state[element.group]!.push(element.user);
};

const groupMembersSlice = createSlice({
  name: "member",
  initialState: {} as Store.AppState["entities"]["member"],
  reducers: {
    fetched: (state, { payload }) => {
      state = {};
      payload.forEach((element) => {
        add(state, element);
      });
      return state;
    },
    add: (state, { payload }) => {
      add(state, payload);
    },
    remove: (state, { payload }) => {
      console.log(payload, JSON.parse(JSON.stringify(state[payload.id])));
      if (state[payload.id]) {
        state[payload.id] = state[payload.id].filter(
          (element) => element._id !== payload.user
        );
      }
      console.log(payload, JSON.parse(JSON.stringify(state[payload.id])));
    },
  },
});

export const actions = groupMembersSlice.actions;
export default groupMembersSlice.reducer;

export const getAllGroupMembers = (state: Store.AppState) =>
  state.entities.member;

export const getGroupMembers = createSelector(
  [getAllGroupMembers, (_, id: string) => id],
  (members, id) => members[id]
);
