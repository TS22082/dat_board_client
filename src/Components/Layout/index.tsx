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
import { LayoutProps } from '../../sys/types.ts';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { handleNavigate } = useRadNavigation();
  const { handleLogout, theme } = useLayoutData();

  const pointerStyle = {
    cursor: 'pointer',
  };

  return (
    <AppContainer theme={theme}>
      <>
        <AppHeader>
          <ToolTip theme={theme} position="right" text="Menu">
            <Menu
              style={pointerStyle}
              color={theme === 'light' ? 'black' : 'white'}
              size="medium"
            />
          </ToolTip>
          <NavArea theme={theme}>
            <ToolTip theme={theme} position="down" text="Dashboard">
              <Home
                style={pointerStyle}
                onClick={() =>
                  handleNavigate({ label: 'Dashboard', route: '/home' })
                }
                color={theme === 'light' ? 'black' : 'white'}
                size="large"
              />
            </ToolTip>
            <ToolTip theme={theme} position="down" text="Settings">
              <Services
                style={pointerStyle}
                onClick={() =>
                  handleNavigate({ label: 'Settings', route: '/settings' })
                }
                color={theme === 'light' ? 'black' : 'white'}
                size="large"
              />
            </ToolTip>

            <ToolTip theme={theme} position="down" text="Profile">
              <DocumentUser
                style={pointerStyle}
                onClick={() =>
                  handleNavigate({ label: 'Profile', route: '/profile' })
                }
                color={theme === 'light' ? 'black' : 'white'}
                size="large"
              />
            </ToolTip>
            <ToolTip theme={theme} position="down" text="Applets">
              <Apps
                style={pointerStyle}
                onClick={() =>
                  handleNavigate({ label: 'Applets', route: '/applets' })
                }
                color={theme === 'light' ? 'black' : 'white'}
                size="large"
              />
            </ToolTip>
          </NavArea>
          <ToolTip theme={theme} position="left" text="Logout">
            <Logout
              style={pointerStyle}
              color={theme === 'light' ? 'black' : 'white'}
              size="medium"
              onClick={handleLogout}
            />
          </ToolTip>
        </AppHeader>
        {children}
      </>
    </AppContainer>
  );
};

export default Layout;
