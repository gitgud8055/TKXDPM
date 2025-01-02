import React from "react";
import CustomPageContainer from "../utils/custom-page-container";
import { Breadcrumb, useActivePage } from "@toolpad/core";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGroups } from "@/store/groups";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { getGroupMembers } from "@/store/group-members";
import ListMember from "./card/list-member";

const TabItem = styled(Tab)(({ theme }) => ({
  textTransform: "initial",
  minWidth: 0,
  letterSpacing: 0.5,
  margin: theme.spacing(0, 2),
  padding: 0,
  overflow: "unset",
  fontWeight: 500,
  "&:hover::before": {
    backgroundColor: "rgba(0 0 0 / 0.04)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: "-1rem",
    right: "-1rem",
    height: "100%",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 0,
  },
}));

const Group = ({ id }) => {
  const activePage = useActivePage();
  const group = useSelector((state) => getGroups(state, id));
  const members = useSelector((state) => getGroupMembers(state, id));
  const [tabIndex, setTabIndex] = React.useState("0");
  console.log(group, members, id);
  if (!activePage || !group) return <Navigate to={"/groups"} />;
  const breadcrumbs: Breadcrumb[] = [
    ...activePage.breadcrumbs,
    { title: `${id}`, path: `${activePage?.path}/${id}` },
  ];
  return (
    <CustomPageContainer title={group.name} breadcrumbs={breadcrumbs}>
      <TabContext value={tabIndex}>
        <TabList
          // value={tabIndex}
          onChange={(_, index) => setTabIndex(index)}
          sx={{
            marginLeft: 1,
            [`& .${tabsClasses.indicator}`]: {
              height: 3,
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            },
          }}
          centered
        >
          <TabItem disableRipple label={"Members"} value="0" />
          <TabItem disableRipple label={"Rule"} value="1" />
          <TabItem disableRipple label={"Indexes"} value="2" />
          <TabItem disableRipple label={"Usage"} value="3" />
        </TabList>
        <TabPanel value="0">
          {members && <ListMember members={members} group={group} />}
        </TabPanel>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </CustomPageContainer>
  );
};

export default Group;
