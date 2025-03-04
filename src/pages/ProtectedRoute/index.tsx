import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStateContext } from '../../context/useAppStateContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const { dispatch } = useAppStateContext();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        navigate('/');
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const userResponse = await fetch(`${baseUrl}/api/user`, {
          headers: {
            Authorization: accessToken,
          },
        });

        if (!userResponse.ok) {
          localStorage.removeItem('accessToken');
          navigate('/');
          return;
        }

        const userResponseData = await userResponse.json();

        if (userResponseData.error) {
          localStorage.removeItem('accessToken');
          navigate('/');
          return;
        }

        const { user } = userResponseData;

        dispatch({
          type: 'LOGIN',
          payload: user,
        });

        setConfirmed(true);
      } catch (err) {
        localStorage.removeItem('accessToken');
        navigate('/');
      }
    })();
  }, [navigate, dispatch]);

  return confirmed ? children : null;
};

export default ProtectedRoute;
