import React, { useEffect, useRef, useState } from "react";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";
import { Link } from "react-router-dom";
import CustomPageContainer from "../utils/custom-page-container";
import Test from "./test";
import Wrapper from "./wrapper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "@/store/api";
import { actions as api } from "@/store/api";
import {
  actions as dashboardAction,
  getDashboardDish,
} from "@/store/dashboard-dish";
import Dish from "../cards/dish";

const Homepage = () => {
  const dispatch: any = useDispatch();
  const list = useSelector(getDashboardDish);
  console.log(list);
  const handleClick =
    (fetched: boolean = false) =>
    () => {
      dispatch(
        api.restCallBegan({
          url: "/api/dishes/random",
          method: "get",
          callback: (payload) => {
            if (fetched) dispatch(dashboardAction.fetched(payload));
            else dispatch(dashboardAction.added(payload));
          },
        })
      );
    };

  useEffect(() => {
    handleClick(true)();
  }, []);

  return (
    <>
      <SidebarWrapper>
        <CustomPageContainer breadcrumbs={[]}>
          <div className="flex h-full w-full flex-row flex-wrap justify-center mt-3 gap-3">
            {list &&
              list.map((item) => (
                <div key={item._id}>
                  <Dish data={item} />
                </div>
              ))}
          </div>
        </CustomPageContainer>
      </SidebarWrapper>
    </>
  );
};

export default Homepage;
