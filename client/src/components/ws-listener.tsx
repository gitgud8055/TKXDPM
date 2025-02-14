import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions as meta,
  getHasListenedToWS,
  getFetchedEntities,
} from "@/store/meta";
import { actions as favs } from "../store/favs";
import { actions as dish } from "../store/dish";
import { openDialog } from "../store/ui";
import { actions as groups } from "../store/groups";
import { actions as groupMembers } from "../store/group-members";
import { actions as auth } from "../store/auth";

import ws from "../service/ws-service";

const WSListener = () => {
  const hasListenedToWS = useSelector(getHasListenedToWS);
  const fetchedEntities = useSelector(getFetchedEntities);
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (hasListenedToWS || !fetchedEntities) return;
    if (!ws.connected) {
      ws.connect();
      return;
    }
    ws.removeAllListeners();
    ws.on("error", (error) => {
      console.log(error);
      dispatch(
        openDialog({
          variant: "error",
          content: error.message,
          dialogType: "snackbar",
          action: ["close"],
        })
      );
    });
    ws.on("DELETE_FAV_DISH", (args) => dispatch(favs.delete(args.id)));
    ws.on("DELETE_DISH_MAT", (args) => dispatch(dish.removeMat(args)));
    ws.on("UPDATE_DISH_MAT", (args) => dispatch(dish.updateMat(args)));
    ws.on("DELETE_DISH_IMG", (args) => dispatch(dish.removeImg(args)));
    ws.on("UPDATE_DISH", (args) => dispatch(dish.update(args)));
    ws.on("DELEGATE_MEMBER", (args) => dispatch(groups.updateOwner(args)));
    ws.on("DELETE_GROUP_MEMBER", (args) => dispatch(groupMembers.remove(args)));
    ws.on("ADD_DISH_MAT", (args) => dispatch(dish.addMat(args)));
    ws.on("UPDATE_USER", (args) => dispatch(auth.update(args)));
    ws.on("CREATE_FAV_DISH", (args) => {
      dispatch(favs.add(args.fav));
      dispatch(dish.add([args.dish]));
    });
    ws.on("ADD_MEMBER", (args) => dispatch(groupMembers.add(args)));
    ws.on("CREATE_DISH", (args) => {
      dispatch(favs.add(args.fav));
      dispatch(dish.add([args.data]));
    });

    dispatch(meta.listenedToWS());
  }, [hasListenedToWS]);
  return null;
};

export default WSListener;
