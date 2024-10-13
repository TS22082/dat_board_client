import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../context/useAppStateContext";

// import useRadNavigation from "../../hooks/useRadNavigation";
// import ModalContent from "../ModalContent";
// import { LOGOUT } from "../../sys/constants";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAppStateContext();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const rootRoute = path.split("/")[1];

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user, rootRoute, path]);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  // const handleLogout = () => {
  //   dispatch({
  //     type: LOGOUT,
  //     payload: null,
  //   });
  // };

  // const navItems = [
  //   {
  //     text: "Dashboard",
  //     path: "/home",
  //   },
  //   {
  //     text: "Settings",
  //     path: "/settings",
  //   },
  //   {
  //     text: "Profile",
  //     path: "/profile",
  //   },
  //   {
  //     text: "Applets",
  //     path: "/applets",
  //   },
  // ];

  return <div>{children}</div>;
};

export default Layout;
