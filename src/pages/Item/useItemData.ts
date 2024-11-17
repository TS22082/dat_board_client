import { useEffect, useState } from 'react';
import { ItemType } from '../../sys/types';
import { useParams } from 'react-router-dom';
import { useAppStateContext } from '../../context/useAppStateContext';
import { SET_ITEMS } from '../../sys/constants';

const useItemData = () => {
  const params = useParams();
  const [item, setItem] = useState<ItemType>({
    id: '',
    title: '',
    parentId: '',
    isPublic: false,
  });
  const [itemLoading, setItemLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  const { items, dispatch } = useAppStateContext();

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

  useEffect(() => {
    const id = params.id || '';
    if (!id) return;

    setItemsLoading(true);

    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/items?parentId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken') || '',
          },
        });

        if (!response.ok) {
          console.error('Error fetching items:', response.statusText);
          return;
        }

        const data = await response.json();

        if (data) {
          dispatch({
            type: SET_ITEMS,
            payload: data,
          });
        }
      } catch (error) {
        console.error('error', error);
      } finally {
        setItemsLoading(false);
      }
    })();
  }, [dispatch, params.id]);

  return {
    item,
    items,
    itemLoading,
    itemsLoading,
  };
};

export default useItemData;
