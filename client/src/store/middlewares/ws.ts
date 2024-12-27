import ws from "../../service/ws-service";
import { actions } from "../api";

export default (store) => (next) => async (action) => {
  if (action.type !== actions.wsCallBegan.type) {
    return next(action);
  }

  const { data, event } = action.payload;

  next(action);
  console.log(data, event);
  ws.emit(event, data);
};
