import { useEffect } from "react";
import { toast } from "react-toastify";
import useRadNavigation from "../../hooks/useRadNavigation";

const SSORedirect = () => {
  const queryParam = new URLSearchParams(window.location.search);
  const code = queryParam.get("code");
  const { handleNavigate } = useRadNavigation();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/github/gh_login?code=${code}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (!data?.token) {
          toast.error("There was an error");
          return;
        }

        const { token } = data;
        localStorage.setItem("accessToken", token);

        handleNavigate({ label: "Dashboard", route: "/home" });
      } catch (err) {
        console.log("this is the error ==>", err);
      }
    })();
  }, [code, handleNavigate]);

  return (
    <div>
      <h1>Loading ...</h1>
    </div>
  );
};

export default SSORedirect;
