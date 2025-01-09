import { REST, Store } from "@gitgud/types";
import { createSlice } from "@reduxjs/toolkit";
import { actions as api } from "./api";
import { openDialog } from "./ui";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  } as Store.AppState["auth"],
  reducers: {
    attempt: (state) => {
      state.loading = true;
    },
    Logout: (state) => {
      // delete state.user;
    },
    attemptSucceed: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    update: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
    attemptFailed: (state) => {
      state.loading = false;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;

export const login = (data: REST.To["/login"]) => (dispatch) => {
  dispatch(actions.attempt());
  dispatch(
    api.restCallBegan({
      url: "/api/auth/login",
      method: "post",
      data,
      errorDisplay: "swal",
      callback: (payload) => {
        dispatch(actions.attemptSucceed(payload));
      },
      errorCallback: () => {
        dispatch(actions.attemptFailed());
      },
    })
  );
};

export const register = (data: REST.To["/register"]) => (dispatch) => {
  dispatch(actions.attempt());
  dispatch(
    api.restCallBegan({
      url: "/api/auth/register",
      method: "post",
      data,
      errorDisplay: "swal",
      callback: () => {
        dispatch(actions.attemptFailed());
        dispatch(
          openDialog({
            content: "Do u want to login now?",
            variant: "success",
            dialogType: "swal",
            showCancelButton: true,
            callback: (result) => {
              if (result.isConfirmed) {
                window.location.href = "/login";
              }
            },
          })
        );
      },
      errorCallback: () => {
        dispatch(actions.attemptFailed());
      },
    })
  );
};

export const logout = () => (dispatch) => {
  dispatch(
    api.restCallBegan({
      url: "/api/auth/logout",
      method: "get",
      callback: async () => {
        dispatch(actions.Logout());
      },
    })
  );
};

export const getSelf = (state: Store.AppState) => state.auth.user;
