import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Wrapper from "../../pages/wrapper";
import ToolbarActionsSearch from "./toolbar-action";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation } from "react-router-dom";
import { useRouter } from "./useRouter";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "groups",
    title: "Groups",
    icon: <GroupIcon />,
    pattern: "groups/:id?",
  },
  {
    segment: "favourites",
    title: "Favourites",
    icon: <FavoriteIcon />,
    pattern: "favourites/:id?",
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

const pageTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

const SidebarWrapper = (props: any) => {
  const location = useLocation();
  const router = useRouter(location.pathname);

  return (
    <Wrapper {...props}>
      <AppProvider navigation={NAVIGATION} router={router} theme={pageTheme}>
        <DashboardLayout
          branding={{
            title: "J4F",
          }}
          slots={{
            toolbarActions: ToolbarActionsSearch,
          }}
          // defaultSidebarCollapsed
        >
          {props.children}
        </DashboardLayout>
      </AppProvider>
    </Wrapper>
  );
};

export default SidebarWrapper;
