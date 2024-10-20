import useRadNavigation from '../../hooks/useRadNavigation.ts';
import { useState } from 'react';

const useNewItemData = () => {
  const [isPublic, setIsPublic] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const parentId = params.get('parentId');
  const { navigateRaw, backRaw } = useRadNavigation();
  const [title, setTitle] = useState('');

  const createNewItem = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newItem = {
      title: title,
      isPublic: isPublic,
      parentId: parentId || '',
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/item`, {
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

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    backRaw();
  };

  return {
    createNewItem,
    handleCancelClick,
    setIsPublic,
    setTitle,
    title,
    isPublic,
    parentId,
  };
};

export default useNewItemData;
