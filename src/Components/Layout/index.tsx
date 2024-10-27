import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStateContext } from '../../context/useAppStateContext';
import styled from 'styled-components';
import {
  Menu,
  Logout,
  Services,
  Home,
  DocumentUser,
  Apps,
} from 'grommet-icons';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavArea = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: 25px;
  border: 1px solid black;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

import useRadNavigation from '../../hooks/useRadNavigation';
import { LOGOUT, SET_BREAKPOINT } from '../../sys/constants';
import ToolTip from '../Tooltip';
import usePageBreakpoints from '../../hooks/usePageBreakpoints';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, screenSize, dispatch } = useAppStateContext();
  const { handleNavigate } = useRadNavigation();
  const { breakPoint } = usePageBreakpoints();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const rootRoute = path.split('/')[1];

  useEffect(() => {
    if (breakPoint !== screenSize) {
      dispatch({
        type: SET_BREAKPOINT,
        payload: breakPoint,
      });
    }
  }, [breakPoint, screenSize, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user, rootRoute, path]);

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  const pointerStyle = {
    cursor: 'pointer',
  };

  return (
    <AppContainer>
      <AppHeader>
        <ToolTip position="right" text="Menu">
          <Menu style={pointerStyle} color="black" size="medium" />
        </ToolTip>
        <NavArea>
          <ToolTip position="down" text="Dashboard">
            <Home
              style={pointerStyle}
              onClick={() =>
                handleNavigate({ label: 'Dashboard', route: '/home' })
              }
              color="black"
              size="large"
            />
          </ToolTip>
          <ToolTip position="down" text="Settings">
            <Services
              style={pointerStyle}
              onClick={() =>
                handleNavigate({ label: 'Settings', route: '/settings' })
              }
              color="black"
              size="large"
            />
          </ToolTip>

          <ToolTip position="down" text="Profile">
            <DocumentUser
              style={pointerStyle}
              onClick={() =>
                handleNavigate({ label: 'Profile', route: '/profile' })
              }
              color="black"
              size="large"
            />
          </ToolTip>
          <ToolTip position="down" text="Applets">
            <Apps
              style={pointerStyle}
              onClick={() =>
                handleNavigate({ label: 'Applets', route: '/applets' })
              }
              color="black"
              size="large"
            />
          </ToolTip>
        </NavArea>
        <ToolTip position="left" text="Logout">
          <Logout
            style={pointerStyle}
            color="black"
            size="medium"
            onClick={handleLogout}
          />
        </ToolTip>
      </AppHeader>
      {children}
    </AppContainer>
  );
};

export default Layout;
