import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSSORedirectData = () => {
  const queryParam = new URLSearchParams(window.location.search);
  const code = queryParam.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/github/gh_login?code=${code}`);
        const data = await response.json();
        if (data.error) {
          console.log("Error ==>", data.error);
          return;
        }

        const accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      } catch (err) {
        console.log("There was an error ==>", err);
      }
    })();
  }, []);

  return { code };
};

export default useSSORedirectData;
