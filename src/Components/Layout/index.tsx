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
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronLeft, Logout } from "@mui/icons-material";
import { useAppStateContext } from "../AppStateContext";
import { useNavigate } from "react-router-dom";

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
  const { state, dispatch } = useAppStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) navigate("/");
  }, [state]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
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
            <Typography variant="h6" noWrap>
              Dat Dash
            </Typography>
            <IconButton
              onClick={handleLogout}
              color="inherit"
              aria-label="logout"
              edge="end"
            >
              <Logout />
            </IconButton>
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
          {["Item 1", "Item 2", "Item 3"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;
