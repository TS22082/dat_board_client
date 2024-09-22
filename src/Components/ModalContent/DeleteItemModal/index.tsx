import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useAppStateContext } from "../../../hooks/useAppStateContext";
import { CLOSE_MODAL } from "../../../sys/constants";

const DeleteItemModal = () => {
  const { modalData, dispatch } = useAppStateContext();

  const deleteItemById = async () => {
    if (!modalData || !modalData.data) return;

    try {
      const authorizationToken = localStorage.getItem("accessToken") || "";

      if (!authorizationToken) return;

      const response = await fetch(`/api/item/${modalData.data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken") || "",
        },
      });

      if (!response.ok) {
        console.error("Error deleting item:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Item deleted:", data);

      dispatch({
        type: CLOSE_MODAL,
        payload: null,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography>Are you sure you want to delete this item?</Typography>
      <ButtonGroup
        sx={{ width: "100%" }}
        variant="contained"
        aria-label="outlined button group"
      >
        <Button sx={{ width: "100%" }}>Cancel</Button>
        <Button sx={{ width: "100%" }} onClick={deleteItemById}>
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DeleteItemModal;
