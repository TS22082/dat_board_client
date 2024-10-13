import useItemData from "./useItemData";
import { ItemType } from "../../sys/types";
import ItemCard from "../../Components/ItemCard";
import { QRCodeCanvas } from "qrcode.react";

const Item = () => {
  const { item, itemLoading, items, itemsLoading } = useItemData();

  return (
    <>
      <div>
        <h1>{itemLoading ? "Loading..." : item.title}</h1>
        <QRCodeCanvas value={item.id} />
        <h1>{itemsLoading && "Loading..."}</h1>
        <div>
          {items.map((i: ItemType) => (
            <div>
              <ItemCard item={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Item;
