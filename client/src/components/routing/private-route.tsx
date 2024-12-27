import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSelf } from "@/store/auth";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { getFetchedEntities } from "@/store/meta";
import LoadingPage from "../pages/loading-page";

const PrivateRoute: React.FC<RouteProps> = () => {
  const user = useSelector(getSelf);
  const fetchedEntities = useSelector(getFetchedEntities);
  if (!user) return <Navigate to={"/login"} />;
  if (!fetchedEntities) return <LoadingPage />;
  return <Outlet />;
};

export default PrivateRoute;
