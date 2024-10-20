import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRadNavigation from '../../hooks/useRadNavigation.ts';

const useItemsSectionData = () => {
  const [items, setItems] = useState([]);
  const params = useParams();
  const { navigateRaw } = useRadNavigation();

  useEffect(() => {
    const query = params?.id ? `?parentId=${params.id}` : '';

    (async () => {
      try {
        const accessToken = localStorage.getItem('accessToken') || '';

        if (!accessToken) {
          return;
        }
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/items${query}`, {
          method: 'GET',
          headers: {
            Authorization: accessToken,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setItems(data || []);
      } catch (err) {
        console.error('error ==>', err);
      }
    })();
  }, [params.id]);

  const navigateToNewItemForm = () => {
    let navigatePath = '/item/new';
    if (params?.id) navigatePath += `?parentId=${params.id}`;
    navigateRaw(navigatePath);
  };

  return {
    items,
    navigateToNewItemForm,
  };
};

export default useItemsSectionData;
