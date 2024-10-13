import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppStateContext } from "../../../context/useAppStateContext";
import { ADD_ITEM, CLOSE_MODAL } from "../../../sys/constants";

const CreateThingModal = () => {
  const [form, setForm] = useState({
    title: "",
    parentId: "",
    isPublic: false,
  });

  const { dispatch } = useAppStateContext();
  const { id } = useParams();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", form);

    const newItem = { ...form, parentId: id || "" };

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await fetch("/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        console.error("Error creating item:", response.statusText);
        return;
      }

      const data = await response.json();

      dispatch({
        type: ADD_ITEM,
        payload: data.message,
      });

      dispatch({
        type: CLOSE_MODAL,
        payload: null,
      });
    } catch (err) {
      console.error("this is the error ==>", err);
    }
  };

  const cancelCreate = () => {
    dispatch({
      type: CLOSE_MODAL,
      payload: null,
    });
  };

  const togglePublic = () => {
    setForm({
      ...form,
      isPublic: !form.isPublic,
    });
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
      <Typography variant="h6">Create new item</Typography>
      <Form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            type="text"
            id="title"
            value={form.title}
            label="Title"
            variant="outlined"
            onChange={handleTextChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Switch
              id="isPublic"
              checked={form.isPublic}
              onChange={togglePublic}
            />
            <Typography variant="body2">
              {form.isPublic ? "Public" : "Private"}
            </Typography>
          </Box>
        </FormControl>
        <Box>
          <ButtonGroup
            sx={{ width: "100%" }}
            variant="contained"
            aria-label="outlined button group"
          >
            <Button
              onClick={cancelCreate}
              sx={{ width: "100%" }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              disabled={!form.title}
              sx={{ width: "100%" }}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </Form>
    </Box>
  );
};

export default CreateThingModal;
