import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as meta, getHasListenedToWS } from "@/store/meta";
import { actions as favs } from "../store/favs";
import ws from "../service/ws-service";
import { openDialog } from "../store/ui";

const WSListener = () => {
  const hasListenedToWS = useSelector(getHasListenedToWS);
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (hasListenedToWS) return;

    ws.on("error", (error) => {
      dispatch(
        openDialog({
          variant: "error",
          content: error.message,
          dialogType: "snackbar",
          action: ["close"],
        })
      );
    });
    ws.on("DELETE_FAV_DISH", (args) => {
      dispatch(favs.delete(args.id));
    });
    ws.on("DELETE_DISH_MAT", (args) => {});
    ws.on("UPDATE_DISH_MAT", (args) => {});

    dispatch(meta.listenedToWS());
  }, [hasListenedToWS]);
  return null;
};

export default WSListener;
