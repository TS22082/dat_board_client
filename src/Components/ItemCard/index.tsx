import React from "react";
import { ItemCardProps } from "../../sys/types";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DeleteOutline, DoubleArrowOutlined } from "@mui/icons-material";
import useRadNavigation from "../../hooks/useRadNavigation";
import { useAppStateContext } from "../../context/useAppStateContext";
import { DELETE_ITEM_MODAL, OPEN_MODAL } from "../../sys/constants";

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { dispatch } = useAppStateContext();
  const { handleNavigate } = useRadNavigation();

  const handleDelete = (id: string, title: string) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        type: DELETE_ITEM_MODAL,
        data: { id, title },
      },
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography>{item.title}</Typography>
      </CardContent>
      <Box
        sx={{
          width: 80,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          fullWidth
          onClick={() => handleDelete(item.id, item.title)}
          color="error"
        >
          <DeleteOutline />
        </Button>
        <Button color="primary" fullWidth>
          <DoubleArrowOutlined
            onClick={() => {
              handleNavigate({
                label: item.title,
                route: `/item/${item.id}`,
              });
            }}
          />
        </Button>
      </Box>
    </Card>
  );
};

export default ItemCard;
