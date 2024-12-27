import React from "react";
import { useParams } from "react-router-dom";
import Mainpage from "../favourite-page/mainpage";
import Preview from "../favourite-page/favourite";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";

const FavouritePage = () => {
  const { id } = useParams();

  return (
    <SidebarWrapper>{id ? <Preview id={id} /> : <Mainpage />}</SidebarWrapper>
  );
};

export default FavouritePage;
