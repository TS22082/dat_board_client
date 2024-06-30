import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SSORedirect = () => {
  const queryParam = new URLSearchParams(window.location.search);
  const code = queryParam.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/github/gh_login?code=${code}`);
        const data = await response.json();
        if (data.error) {
          toast.error("There was an error");
          return;
        }

        const accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);
        navigate("/home");
      } catch (err) {
        toast("there was a problem");
      }
    })();
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SSORedirect;
