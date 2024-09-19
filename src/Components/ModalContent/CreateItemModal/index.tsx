import { Box, Typography } from "@mui/material";

const CreateItemModal = () => {
  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Boom
      </Typography>
    </Box>
  );
};

export default CreateItemModal;
