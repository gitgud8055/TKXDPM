import { actions as api } from "../api";
import { actions as meta } from "../meta";
import { actions as groups } from "../groups";
import { actions as favs } from "../favs";
import { actions as dish } from "../dish";
import { REST } from "@gitgud/types";
export default () => (dispatch) => {
  dispatch(
    api.restCallBegan({
      url: "/api/users/entities",
      method: "get",
      errorDisplay: "snackbar",

      callback: (data: REST.From.GET["/api/users/entities"]) => {
        dispatch(groups.fetched(data.groups));
        dispatch(favs.fetched(data.favs));
        dispatch(dish.fetched(data.dish));
        dispatch(meta.fetchedEntities());
      },
      errorCallback: (data) => {},
    })
  );
};
