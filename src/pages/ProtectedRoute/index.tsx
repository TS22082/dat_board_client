import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRoute> = ({ children }) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      try {
        const tokenResponse = await fetch("/api/verify_jwt", {
          headers: {
            Authorization: accessToken,
          },
        });

        const data = await tokenResponse.json();

        if (data.error) {
          localStorage.removeItem("accessToken");
          navigate("/auth");
        }

        const userReponse = await fetch("/api/user", {
          headers: {
            Authorization: accessToken,
          },
        });

        const userData = await userReponse.json();
        console.log("User data ==>", userData);

        setConfirmed(true);
      } catch (err) {
        console.log("There was an error ==>", err);
      }
    })();
  }, []);
  return confirmed ? children : null;
};

export default ProtectedRoute;
