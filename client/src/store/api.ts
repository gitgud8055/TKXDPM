import { WS } from "@gitgud/types";
import { createAction, createSlice } from "@reduxjs/toolkit";

export const actions = {
  restCallBegan: createAction<APIArgs>("api/restCallBegan"),
  restCallSucceed: createAction<object>("api/restCallSucceed"),
  restCallFailed: createAction<object>("api/restCallFailed"),
  wsCallBegan: createAction<WSArgs>("api/wsCallBegan"),
};

export interface APIArgs {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  headers?: object;
  data?: object;
  errorDisplay?: "snackbar" | "swal";
  onSuccess?: string[];
  callback?: (payload: any) => any;
  errorCallback?: (payload: any) => any;
}

export interface WSArgs {
  data?: object;
  event: keyof WS.To;
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
