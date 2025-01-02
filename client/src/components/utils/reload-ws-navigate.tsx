import React from "react";
import { Navigate, NavigateProps } from "react-router-dom";
import ws from "../../service/ws-service";

export default function ReloadNavigate(props: NavigateProps) {
  ws.disconnect();
  console.log("disconnect");
  return <Navigate {...props} />;
}
