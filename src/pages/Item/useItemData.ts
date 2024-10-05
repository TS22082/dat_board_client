import { useEffect, useState } from "react";
import { ItemType } from "../../sys/types";
import { useParams } from "react-router-dom";

const useItemData = () => {
  const params = useParams();
  const [item, setItem] = useState<ItemType>({
    id: "",
    title: "",
    parentId: "",
    isPublic: false,
  });
  const [itemLoading, setItemLoading] = useState(true);

  const [items, setItems] = useState<ItemType[]>([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const authorizationToken = localStorage.getItem("accessToken") || "";
      setItemLoading(true);

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
        setItemLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [params]);

  useEffect(() => {
    const id = params.id || "";
    if (!id) return;

    setItemsLoading(true);

    (async () => {
      try {
        const response = await fetch(`/api/items?parentId=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken") || "",
          },
        });

        if (!response.ok) {
          console.error("Error fetching items:", response.statusText);
          return;
        }

        const data = await response.json();

        if (!data) {
          setItems([]);
          return;
        }

        if (data) setItems(data);
      } catch (error) {
        console.error("error", error);
      } finally {
        setItemsLoading(false);
      }
    })();
  }, [params.id]);

  return {
    item,
    items,
    itemLoading,
    itemsLoading,
  };
};

export default useItemData;
