import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "@/store/auth";

const Logout = () => {
  const dispatch: any = useDispatch();
  dispatch(logout());
  return <Navigate to={"/login"} />;
};

export default Logout;
