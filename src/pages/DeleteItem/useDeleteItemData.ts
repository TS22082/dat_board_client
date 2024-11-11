import useRadNavigation from '../../hooks/useRadNavigation.ts';
import React from 'react';

const useDeleteItemData = () => {
  const { handleBack } = useRadNavigation();

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleBack();
  };

  return {
    handleCancelClick,
  };
};

export default useDeleteItemData;
