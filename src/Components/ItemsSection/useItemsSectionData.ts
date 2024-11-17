import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRadNavigation from '../../hooks/useRadNavigation.ts';
import catchError from '../../sys/utils/catchError.ts';
import requestHeaders from '../../sys/utils/requestHeaders.ts';
import { useAppStateContext } from '../../context/useAppStateContext.ts';

const useItemsSectionData = () => {
  const [items, setItems] = useState([]);
  const params = useParams();
  const { navigateRaw } = useRadNavigation();
  const { theme } = useAppStateContext();

  useEffect(() => {
    const query = params?.id ? `?parentId=${params.id}` : '';

    (async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const getItemsHeaders = requestHeaders('GET');

      if (!getItemsHeaders) {
        throw new Error('No access token');
      }

      const [requestErr, response] = await catchError(() =>
        fetch(`${baseUrl}/api/items${query}`, getItemsHeaders)
      );

      if (requestErr || !response || !response.ok) {
        setItems([]);
        throw new Error('Network response was not ok');
      }

      const [jsonParseErr, data] = await catchError(() => response.json());

      if (jsonParseErr || !data) {
        setItems([]);
        throw new Error('Network response was not ok');
      }

      setItems(data || []);
    })();
  }, [params.id]);

  const navigateToNewItemForm = () => {
    let navigatePath = '/item/new';
    if (params?.id) navigatePath += `?parentId=${params.id}`;
    navigateRaw(navigatePath);
  };

  return {
    items,
    theme,
    navigateToNewItemForm,
  };
};

export default useItemsSectionData;
