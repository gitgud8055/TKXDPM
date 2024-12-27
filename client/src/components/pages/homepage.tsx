import React from "react";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";
import { Link } from "react-router-dom";
import CustomPageContainer from "../utils/custom-page-container";
import Test from "./test";
import Wrapper from "./wrapper";

const Homepage = () => {
  return (
    <>
      <SidebarWrapper>
        <CustomPageContainer breadcrumbs={[]}></CustomPageContainer>
      </SidebarWrapper>
    </>
  );
};

export default Homepage;
