import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dat Dash
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Dat Dash
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop solution for all your data management needs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/auth")}
            sx={{ mt: 4 }}
          >
            Log in or Create an Account
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
