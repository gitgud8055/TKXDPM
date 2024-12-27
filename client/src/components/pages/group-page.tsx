import React from "react";
import { useParams } from "react-router-dom";
import MainGroup from "../group/main-group";
import Group from "../group/group";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";

const GroupPage = () => {
  const { id } = useParams();
  return (
    <SidebarWrapper>{id ? <Group id={id} /> : <MainGroup />}</SidebarWrapper>
  );
};

export default GroupPage;
