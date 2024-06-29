import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import useAuthPageData from "./useAuthPageData";

const AuthPage = () => {
  const { redirectToGithub } = useAuthPageData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={3}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Auth Page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GitHubIcon />}
        onClick={redirectToGithub}
        sx={{ mt: 2 }}
      >
        Sign in with GitHub
      </Button>
    </Box>
  );
};

export default AuthPage;
