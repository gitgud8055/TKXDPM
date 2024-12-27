import { createSlice } from "@reduxjs/toolkit";
import { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import event from "../service/event-service";
import { Store } from "@gitgud/types";

const slice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpened: true,
  } as Store.AppState["ui"],
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpened = !state.sidebarOpened;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export type Dialog = SweetAlertOptions & {
  content: string | JSX.Element;
  variant: "info" | "error" | "success" | "warning";
  dialogType?: "swal" | "snackbar";
  // for snackbar
  action?: "close"[];
  // for sweetalert
  callback?: (result: SweetAlertResult) => void;
};

export const openDialog = (dialog: Dialog) => () =>
  event.emit("dialog", dialog);

export const getSidebar = (state) => state.ui.sidebarOpened;
