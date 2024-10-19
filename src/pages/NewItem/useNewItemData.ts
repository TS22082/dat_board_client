const useNewItemData = () => {
  const params = new URLSearchParams(window.location.search);
  const parentId = params.get('parentId');

  const createNewItem = () => {
    console.log('Parent ID ==>', parentId);
  };

  return { parentId, createNewItem };
};

export default useNewItemData;
