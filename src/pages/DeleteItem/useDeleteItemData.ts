import useRadNavigation from '../../hooks/useRadNavigation.ts';
import React from 'react';
import catchError from '../../sys/utils/catchError.ts';
import requestHeaders from '../../sys/utils/requestHeaders.ts';

const useDeleteItemData = () => {
  const { handleBack } = useRadNavigation();
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('itemId');

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleBack();
  };

  const handleDeleteItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const deleteItemHeaders = requestHeaders('DELETE');

    if (!deleteItemHeaders) {
      throw new Error('No Access Token');
    }

    const [deleteErr, deleteResponse] = await catchError(() =>
      fetch(`${baseUrl}/api/item/${itemId}`, deleteItemHeaders)
    );

    if (deleteErr || !deleteResponse || !deleteResponse.ok) {
      console.error('error deleting item ==>', deleteErr);
      throw new Error('Error deleting item');
    }

    const [parseJsonErr, deleteResponseData] = await catchError(() =>
      deleteResponse.json()
    );

    if (parseJsonErr) {
      console.error(parseJsonErr);
      throw new Error('Error parsing json');
    }

    console.log('deleteResponse ==> ', deleteResponseData);
    handleBack();
  };

  return {
    handleDeleteItem,
    handleCancelClick,
  };
};

export default useDeleteItemData;
