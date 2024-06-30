import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;

      try {
        const response = await fetch("/api/verify_jwt", {
          headers: {
            Authorization: accessToken,
          },
        });

        const data = await response.json();
        if (!data.error) navigate("/home");
      } catch (err) {
        toast("There was an error verifying this identity");
      }
    })();
  }, []);

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
            Get Started
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
