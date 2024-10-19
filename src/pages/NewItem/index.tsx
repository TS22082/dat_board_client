import useNewItemData from './useNewItemData.ts';

const NewItem = () => {
  const { createNewItem } = useNewItemData();
  return <button onClick={createNewItem}>This is the thing</button>;
};

export default NewItem;
