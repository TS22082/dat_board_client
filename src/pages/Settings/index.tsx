import { Box, Switch, Typography } from "@mui/material";
import { useAppStateContext } from "../../hooks/useAppStateContext";
import { TOGGLE_THEME } from "../../sys/constants";

const Settings = () => {
  const { theme, dispatch } = useAppStateContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography>Light / Dark mode</Typography>
      <Switch
        checked={theme !== "light"}
        onChange={() => dispatch({ type: TOGGLE_THEME, payload: null })}
      />
    </Box>
  );
};

export default Settings;
