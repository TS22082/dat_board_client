import { useEffect, useState } from 'react';

type Response = {
  message: string;
};

const Profile = () => {
  const [response, setResponse] = useState<Response | null>({ message: '' });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${baseUrl}/api/delay/1`, { signal });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponse(data);
      } catch {
        console.error('error');
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return <h1>Profile {response?.message}</h1>;
};

export default Profile;
