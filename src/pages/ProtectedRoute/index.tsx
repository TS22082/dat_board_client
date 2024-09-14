import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../hooks/useAppStateContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const { dispatch } = useAppStateContext();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/");
        return;
      }

      try {
        const userResponse = await fetch("/api/user", {
          headers: {
            Authorization: accessToken,
          },
        });

        const userResponseData = await userResponse.json();

        if (userResponseData.error) {
          localStorage.removeItem("accessToken");
          navigate("/");
          return;
        }

        const { user } = userResponseData;

        dispatch({
          type: "LOGIN",
          payload: user,
        });

        setConfirmed(true);
      } catch (err) {
        localStorage.removeItem("accessToken");
        navigate("/");
      }
    })();
  }, [navigate, dispatch]);

  return confirmed ? children : null;
};

export default ProtectedRoute;
