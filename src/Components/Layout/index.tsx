import React, { useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  ThemeOptions,
  createTheme,
  Divider,
  Button,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../hooks/useAppStateContext";
import { BreadCrumb } from "../../sys/types";
import useRadNavigation from "../../hooks/useRadNavigation";
import ModalContent from "../ModalContent";
import {
  CLOSE_MODAL,
  CREATE_ITEM_MODAL,
  LOGOUT,
  OPEN_MODAL,
} from "../../sys/constants";

type LayoutProps = {
  children: React.ReactNode;
};

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ open }) => ({
  flexGrow: 1,
  padding: "24px",
  marginTop: "64px", // Add margin to push content below AppBar
  transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ open }) => ({
  transition:
    "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  }),
}));

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  justifyContent: "flex-end",
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { user, theme, modalData, dispatch } = useAppStateContext();
  const { breadcrumbs, handleNavigate } = useRadNavigation();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const rootRoute = path.split("/")[1];
  const [rootPath, setRootPath] = React.useState<string>(`/${rootRoute}`);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user, rootRoute, path]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  const navItems = [
    {
      text: "Dashboard",
      path: "/home",
    },
    {
      text: "Settings",
      path: "/settings",
    },
    {
      text: "Profile",
      path: "/profile",
    },
    {
      text: "Applets",
      path: "/applets",
    },
  ];

  const lightModeOptions: ThemeOptions = {
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#555555",
      },
    },
  };

  const darkModeOptions: ThemeOptions = {
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#ff4081",
      },
      background: {
        default: "#121212",
        paper: "#424242",
      },
      text: {
        primary: "#ffffff",
        secondary: "#bbbbbb",
      },
    },
  };

  const selectedTheme = createTheme(
    theme === "light" ? lightModeOptions : darkModeOptions
  );

  return (
    <ThemeProvider theme={selectedTheme}>
      <Modal
        open={modalData !== null}
        onClose={() => dispatch({ type: CLOSE_MODAL, payload: null })}
        aria-labelledby="modal"
        aria-describedby="modal"
      >
        <ModalContent />
      </Modal>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>{" "}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <>
                    {breadcrumbs.map(
                      (breadcrumb: BreadCrumb, index: number) => (
                        <>
                          <Typography
                            key={index}
                            aria-label={breadcrumb.label}
                            noWrap
                            onClick={() => {
                              setRootPath(breadcrumb.route);
                              handleNavigate(breadcrumb);
                            }}
                            sx={{
                              cursor: "pointer",
                              textDecoration:
                                `/${breadcrumb.route.split("/")[1]}` ===
                                rootPath
                                  ? "underline"
                                  : "none",
                            }}
                          >
                            {breadcrumb.label}{" "}
                          </Typography>
                          {index < breadcrumbs.length - 1 && "/"}
                        </>
                      )
                    )}
                  </>
                )}
              </Box>

              {breadcrumbs && breadcrumbs.length < 0 && (
                <Typography variant="h6" noWrap>
                  Dat Dash
                </Typography>
              )}

              {rootPath === "/home" && (
                <Button
                  onClick={() =>
                    dispatch({
                      type: OPEN_MODAL,
                      payload: { type: CREATE_ITEM_MODAL },
                    })
                  }
                  color="inherit"
                  variant="outlined"
                >
                  New
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBarStyled>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <List>
            {navItems.map((item) => (
              <ListItem
                sx={{ cursor: "pointer", margin: 0, padding: 0 }}
                key={item.text}
              >
                <ListItemText
                  onClick={() => {
                    setRootPath(item.path);
                    handleNavigate({ label: item.text, route: item.path });
                  }}
                  primary={item.text}
                  className={
                    item.path === rootPath
                      ? "active_nav_item"
                      : "inactive_nav_item"
                  }
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem sx={{ cursor: "pointer", margin: 0, padding: 0 }}>
              <ListItemText
                sx={{
                  paddingLeft: "10px",
                }}
                onClick={() => {
                  handleLogout();
                }}
                primary="Logout"
              />
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
