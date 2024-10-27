import { useEffect } from 'react';
import { useAppStateContext } from '../../context/useAppStateContext.ts';
import usePageBreakpoints from '../../hooks/usePageBreakpoints.ts';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, SET_BREAKPOINT } from '../../sys/constants.ts';

const useLayoutData = () => {
  const { user, screenSize, dispatch } = useAppStateContext();
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

  return {
    handleLogout,
  };
};

export default useLayoutData;
