import React, { useEffect } from "react";
import event from "../service/event-service";
import { Dialog } from "../store/ui";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { actions as meta } from "../store/meta";
const EventListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleDialog = (dialog: Dialog) => {
      const actions = {
        close: (key) => (
          <button key={key} onClick={() => closeSnackbar(key)}>
            Dismiss
          </button>
        ),
      };
      const func = {
        swal: (dialog: Dialog) => {
          const { content, variant, dialogType, action, callback, ...data } =
            dialog;
          Swal.fire({
            heightAuto: false,
            icon: variant,
            html: content,
            ...data,
          }).then(callback);
        },
        snackbar: (dialog: Dialog) => {
          enqueueSnackbar(`${dialog.content}`, {
            variant: dialog.variant,
            anchorOrigin: { horizontal: "left", vertical: "bottom" },
            action: (key) =>
              dialog.action?.map((actionType) => actions[actionType](key)),
          });
        },
      };
      if (dialog.dialogType) func[dialog.dialogType](dialog);
    };
    event.removeAllListeners("dialog");
    event.removeAllListeners("WSConnected");
    event.on("WSConnected", () => {
      console.log("Connected");
      dispatch(meta.offWS());
      dispatch(meta.reFetchEntities());
    });
    event.on("dialog", handleDialog);
    // event.emit("dialog", {
    //   variant: "info",
    //   content: "testing",
    //   dialogType: "snackbar",
    //   action: ["close"],
    // });
  }, []);
  return null;
};

export default EventListener;
