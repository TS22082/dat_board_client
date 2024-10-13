import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useAppStateContext } from "../../../context/useAppStateContext";
import { CLOSE_MODAL, DELETE_ITEM_BY_ID } from "../../../sys/constants";

const DeleteItemModal = () => {
  const { modalData, dispatch } = useAppStateContext();

  const deleteItemById = async () => {
    if (!modalData || !modalData.data) return;

    try {
      const authorizationToken = localStorage.getItem("accessToken") || "";

      if (!authorizationToken) return;

      try {
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

        dispatch({
          type: DELETE_ITEM_BY_ID,
          payload: modalData.data.id,
        });

        dispatch({
          type: CLOSE_MODAL,
          payload: null,
        });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const cancelDelete = () => {
    dispatch({
      type: CLOSE_MODAL,
      payload: null,
    });
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
        <Button sx={{ width: "100%" }} onClick={cancelDelete}>
          Cancel
        </Button>
        <Button sx={{ width: "100%" }} onClick={deleteItemById}>
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default DeleteItemModal;
