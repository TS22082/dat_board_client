import { useEffect, useState } from 'react';
import { WidgetType } from '../../sys/types.ts';

const useAppletsData = () => {
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const authorizationToken = localStorage.getItem('accessToken') || '';

        if (!baseUrl || !authorizationToken) {
          return console.error('Trouble accessing required info');
        }

        const response = await fetch(`${baseUrl}/api/widgets`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizationToken,
          },
          signal,
        });

        const data = await response.json();
        setWidgets(data);
      } catch (err) {
        console.error('error ==>', err);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    widgets,
  };
};

export default useAppletsData;
