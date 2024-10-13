import { useEffect } from "react";
import { ItemType } from "../../sys/types";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAppStateContext } from "../../context/useAppStateContext";

import ItemCard from "../../Components/ItemCard";
import { SET_ITEMS } from "../../sys/constants";

const Dashboard = () => {
  const { items, dispatch } = useAppStateContext();

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
          <ItemCard item={item} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Dashboard;
