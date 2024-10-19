import useRadNavigation from '../../hooks/useRadNavigation.ts';

const useNewItemData = () => {
  const params = new URLSearchParams(window.location.search);
  const parentId = params.get('parentId');
  const { navigateRaw } = useRadNavigation();

  const createNewItem = async () => {
    const newItem = {
      title: 'New Item',
      isPublic: false,
      parentId: parentId || '',
    };

    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken') || '',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const goToAddress = parentId ? `/item/${parentId}` : '/home';

      navigateRaw(goToAddress);
    } catch (err) {
      console.log('this is the error ==>', err);
    }
  };

  return { parentId, createNewItem };
};

export default useNewItemData;
