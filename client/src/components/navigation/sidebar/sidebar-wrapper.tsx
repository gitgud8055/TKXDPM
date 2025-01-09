import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation, Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Wrapper from "../../pages/wrapper";
import ToolbarActionsSearch from "./toolbar-action";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation } from "react-router-dom";
import { useRouter } from "./useRouter";
import Footer from "./footer";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelf, logout } from "@/store/auth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
    segment: "shoppings",
    title: "Shoppings",
    icon: <ShoppingCartIcon />,
  },
  // {
  //   kind: "divider",
  // },
  // {
  //   kind: "header",
  //   title: "Analytics",
  // },
  // {
  //   segment: "reports",
  //   title: "Reports",
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: "sales",
  //       title: "Sales",
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: "traffic",
  //       title: "Traffic",
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  // {
  //   segment: "integrations",
  //   title: "Integrations",
  //   icon: <LayersIcon />,
  // },
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
  const user = useSelector(getSelf);

  const [session, setSession] = useState<Session | null>();
  const dispatch: any = useDispatch();
  useEffect(() => {
    console.log(user);
    setSession({
      user: {
        name: user?.username,
        image: `/avatars/${user?.avatar}`,
        email: user?.email,
      },
    });
  }, [user]);

  const authentication = useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        dispatch(logout());
      },
    };
  }, []);

  return (
    <Wrapper {...props}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={pageTheme}
        authentication={authentication}
        session={session}
      >
        <DashboardLayout
          branding={{
            title: "J4F",
          }}
          slots={{
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: Footer,
            toolbarAccount: () => null,
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
