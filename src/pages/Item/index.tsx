import useItemData from './useItemData';
import { QRCodeCanvas } from 'qrcode.react';
import ItemsSection from '../../Components/ItemsSection';

const Item = () => {
  const { item, itemLoading } = useItemData();

  return (
    <div>
      <h1>{itemLoading ? 'Loading...' : item.title}</h1>
      <QRCodeCanvas value={item.id} />
      <ItemsSection />
    </div>
  );
};

export default Item;
