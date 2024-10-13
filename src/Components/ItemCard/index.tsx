import React from "react";
import { ItemCardProps } from "../../sys/types";
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
    <div>
      <div>
        <h1>{item.title}</h1>
      </div>
      <div>
        <button onClick={() => handleDelete(item.id, item.title)}>
          Delete
        </button>
        <button
          onClick={() => {
            handleNavigate({
              label: item.title,
              route: `/item/${item.id}`,
            });
          }}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;
