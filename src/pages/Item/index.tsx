import { Box, Typography } from "@mui/material";
import useItemData from "./useItemData";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ItemType } from "../../sys/types";
import ItemCard from "../../Components/ItemCard";

const Item = () => {
  const { item, itemLoading, items, itemsLoading } = useItemData();

  return (
    <>
      <Box>
        <Typography variant="h1">
          {itemLoading ? "Loading..." : item.title}
        </Typography>
        <Typography variant="h1">{itemsLoading && "Loading..."}</Typography>
        <Grid2 container spacing={2}>
          {items.map((i: ItemType) => (
            <Grid2 key={i.id} xs={12} sm={6} md={4}>
              <ItemCard item={i} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export default Item;
