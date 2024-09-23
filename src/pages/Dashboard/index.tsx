import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { ItemType } from "../../sys/types";
import { DeleteOutline, DoubleArrowOutlined } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppStateContext } from "../../hooks/useAppStateContext";
import { DELETE_ITEM_MODAL, OPEN_MODAL, SET_ITEMS } from "../../sys/constants";
import useRadNavigation from "../../hooks/useRadNavigation";

const Dashboard = () => {
  const { items, dispatch } = useAppStateContext();
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

  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem("accessToken") || "";

        if (!accessToken) {
          return;
        }

        const response = await fetch("/api/items", {
          method: "GET",
          headers: {
            Authorization: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        dispatch({
          type: SET_ITEMS,
          payload: data,
        });
      } catch (err) {
        console.error("error ==>", err);
      }
    })();
  }, [dispatch]);

  return (
    <Grid2 container spacing={2}>
      {items.map((item: ItemType) => (
        <Grid2 key={item.id} xs={12} sm={6} md={4}>
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
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Dashboard;
