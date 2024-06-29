import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStateContext } from "../../Components/AppStateContext";

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
        const tokenResponse = await fetch("/api/verify_jwt", {
          headers: {
            Authorization: accessToken,
          },
        });

        const data = await tokenResponse.json();

        if (data.error) {
          localStorage.removeItem("accessToken");
          navigate("/");
          return;
        }

        const userResponse = await fetch("/api/user", {
          headers: {
            Authorization: accessToken,
          },
        });

        const responseData = await userResponse.json();

        if (responseData.error) {
          navigate("/");
          return;
        }

        const { user } = responseData;

        dispatch({
          type: "LOGIN",
          payload: user,
        });

        setConfirmed(true);
      } catch (err) {
        console.log("There was an error ==>", err);
      }
    })();
  }, [navigate, dispatch]);

  return confirmed ? children : null;
};

export default ProtectedRoute;
