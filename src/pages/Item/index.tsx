import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemType } from "../../sys/types";

const Item = () => {
  const params = useParams();
  const [item, setItem] = useState<ItemType>({
    id: "",
    title: "",
    parentId: "",
    isPublic: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const authorizationToken = localStorage.getItem("accessToken") || "";
      setLoading(true);

      try {
        if (!params.id) return;

        const response = await fetch(`/api/item/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          signal,
        });

        if (!response.ok) {
          console.error("Error fetching item:", response.statusText);
          return;
        }

        const data = await response.json();

        setItem(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [params]);

  return (
    <Box>
      <Typography variant="h1">
        {loading ? "Loading..." : item.title}
      </Typography>
    </Box>
  );
};

export default Item;
