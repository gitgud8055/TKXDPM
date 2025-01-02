import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Entity, Store, WS } from "@gitgud/types";
import { actions as api } from "./api";
import { notInArray } from "./utils/filter";
import { getAllGroupMembers } from "./group-members";

const slice = createSlice({
  name: "group",
  initialState: [] as Entity.Group[],
  reducers: {
    fetched(state, { payload }) {
      return payload;
    },
    add(state, { payload }) {
      state.push(...notInArray(state, payload));
    },
    update(state, { payload }) {
      const idx = state.findIndex((group) => group._id === payload.id);
      if (idx !== -1) {
        state[idx] = { ...state[idx], ...payload };
      }
    },
    delete(state, { payload }) {
      state = state.filter((group) => group._id !== payload);
    },
    updateOwner: (state, { payload }) => {
      const idx = state.findIndex((group) => group._id === payload.id);
      if (idx !== -1) {
        state[idx] = { ...state[idx], owner: payload.user };
      }
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const createGroup = (data: WS.Params.createGroup) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "CREATE_GROUP",
      data,
    })
  );
};

export const deleteGroup = (groupId: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "DELETE_GROUP",
      data: { groupId } as WS.Params.deleteGroup,
    })
  );
};

export const updateGroup = (data: WS.Params.updateGroup) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "UPDATE_GROUP",
      data,
    })
  );
};

export const getGroups = createSelector(
  [(state: Store.AppState) => state.entities.groups, (_, id) => id],
  (groups, id) => groups.filter((group) => group._id === id)[0]
);

export const getAllGroups = (state: Store.AppState) => state.entities.groups;
export const getAllGroupWithMembers = createSelector(
  [getAllGroups, getAllGroupMembers],
  (groups, membersMap) => {
    return groups.map((group) => ({
      ...group,
      members: membersMap[group._id],
    }));
  }
);

export const filterGroups = (data: string) =>
  createSelector(
    (state) => state.entities.groups,
    (groups) =>
      groups.filter((group) =>
        group.name.toLowerCase().includes(data.toLowerCase())
      )
  );
