import {
  Menu,
  Logout,
  Services,
  Home,
  DocumentUser,
  Apps,
} from 'grommet-icons';

import useRadNavigation from '../../hooks/useRadNavigation';
import ToolTip from '../Tooltip';
import useLayoutData from './useLayoutData.tsx';
import AppContainer from '../AppContainer';
import AppHeader from '../AppHeader';
import NavArea from '../NavArea';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { handleNavigate } = useRadNavigation();
  const { handleLogout } = useLayoutData();

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
