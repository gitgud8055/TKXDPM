import axios from "axios";
import { actions, APIArgs } from "../api";
import { openDialog } from "../ui";

export default (store) => (next) => async (action) => {
  if (action.type !== actions.restCallBegan.type) {
    return next(action);
  }

  const {
    url,
    method,
    headers,
    data,
    onSuccess,
    errorDisplay,
    callback,
    errorCallback,
  } = action.payload as APIArgs;

  next(action);

  try {
    const { data: payload } = await axios.request({
      url,
      method,
      headers,
      data,
    });
    store.dispatch(actions.restCallSucceed(payload));
    if (onSuccess) {
      for (const type of onSuccess) {
        store.dispatch({ type, payload });
      }
    }
    if (callback) await callback(payload);
  } catch (error) {
    const response = (error as any).response;
    store.dispatch(
      openDialog({
        variant: "error",
        content: response.data.message ?? "Unknown error",
        dialogType: errorDisplay ?? "snackbar",
        action: ["close"],
      })
    );
    store.dispatch(actions.restCallFailed({ url, response }));

    if (errorCallback) await errorCallback(error);
  }
};
