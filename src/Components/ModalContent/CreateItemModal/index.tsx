import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  TextField,
} from "@mui/material";
import { Form } from "react-router-dom";
import { useState } from "react";

const CreateThingModal = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", { title, parentId: null, isPublic: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            type="text"
            id="title"
            value={title}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button color="primary">Cancel</Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </Form>
    </Box>
  );
};

export default CreateThingModal;
