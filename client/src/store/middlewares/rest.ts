import axios from "axios";
import { actions, APIArgs } from "../api";

export default (store) => (next) => async (action) => {
  if (action.type !== actions.restCallBegan.type) {
    return next(action);
  }

  const { url, method, headers, data, errorDisplay, callback, errorCallback } =
    action.payload as APIArgs;

  next(action);

  try {
    const { data: payload } = await axios.request({
      url,
      method,
      headers,
      data,
    });

    store.dispatch(actions.restCallSucceed(payload));
    if (callback) await callback(payload);
  } catch (error) {
    const response = (error as any).response;
    store.dispatch(actions.restCallFailed({ url, response }));

    if (errorCallback) await errorCallback(error);
  }
};
