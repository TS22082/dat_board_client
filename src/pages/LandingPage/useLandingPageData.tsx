import { useEffect } from 'react';
import useRadNavigation from '../../hooks/useRadNavigation.ts';

const useLandingPageData = () => {
  const { handleNavigate } = useRadNavigation();

  const loginToGithub = () => {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    window.location.href = url;
  };

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      try {
        const userResponse = await fetch(`${baseUrl}/api/user`, {
          headers: {
            Authorization: accessToken,
          },
        });

        if (!userResponse.ok) {
          localStorage.removeItem('accessToken');
          return;
        }

        const user = await userResponse.json();

        if (!user) {
          localStorage.removeItem('accessToken');
          return;
        }

        handleNavigate({ label: 'Dashboard', route: '/home' });
      } catch (err) {
        console.error('this is the error ==>', err);
      }
    })();
  }, [handleNavigate]);

  return { loginToGithub };
};

export default useLandingPageData;
