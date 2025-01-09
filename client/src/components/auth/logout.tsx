import React from "react";
import { useDispatch } from "react-redux";
import Navigate from "../utils/reload-ws-navigate";
import { logout } from "@/store/auth";

const Logout = () => {
  const dispatch: any = useDispatch();
  dispatch(logout());
  return <Navigate to={"/login"} />;
};

export default Logout;
