import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useRadNavigation from "../../hooks/useRadNavigation";

const LandingPage = () => {
  const { handleNavigate } = useRadNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const userResponse = await fetch("/api/user", {
        headers: {
          Authorization: accessToken,
        },
      });
      if (!userResponse.ok) {
        localStorage.removeItem("accessToken");
        return;
      }
      const user = await userResponse.json();
      if (!user) {
        localStorage.removeItem("accessToken");
        return;
      }

      handleNavigate({ label: "Dashboard", route: "/home" });
    })();
  }, [handleNavigate]);

  return (
    <div>
      <div>
        <h2>Welcome to Dat Dash</h2>
        <h2>Your one-stop solution for all your data management needs.</h2>
        <button onClick={() => navigate("/auth")}>
          Log in or Create an Account
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
