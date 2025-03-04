import { useEffect, useState } from 'react';
import { ItemType } from '../../sys/types';
import { useParams } from 'react-router-dom';

const useItemData = () => {
  const params = useParams();
  const [item, setItem] = useState<ItemType>({
    id: '',
    title: '',
    parentId: '',
    isPublic: false,
  });

  const [itemLoading, setItemLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const authorizationToken = localStorage.getItem('accessToken') || '';
      setItemLoading(true);

      try {
        if (!params.id) return;
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/item/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizationToken,
          },
          signal,
        });

        if (!response.ok) {
          console.error('Error fetching item:', response.statusText);
          return;
        }

        const data = await response.json();

        setItem(data);
      } catch (error) {
        console.error('Error', error);
      } finally {
        setItemLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [params]);

  return {
    item,
    itemLoading,
  };
};

export default useItemData;
