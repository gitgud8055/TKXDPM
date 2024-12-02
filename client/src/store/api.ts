import { createAction, createSlice } from "@reduxjs/toolkit";

export const actions = {
  restCallBegan: createAction<object>("api/restCallBegan"),
  restCallSucceed: createAction<object>("api/restCallSucceed"),
  restCallFailed: createAction<object>("api/restCallFailed"),
};

export interface APIArgs {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers?: object;
  data?: object;
  errorDisplay?: "snackbar" | "swal";
  callback?: (payload: any) => any;
  errorCallback?: (payload: any) => any;
}

const slice = createSlice({
  name: "api",
  initialState: {},
  reducers: {
    restCallSucceed: (state, { payload }) => {
      console.log(payload);
    },
    restCallFailed: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export default slice.reducer;
