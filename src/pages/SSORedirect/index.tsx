import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useRadNavigation from '../../hooks/useRadNavigation';
import LoadingContainer from '../../Fragments/LoadingContainer.tsx';

const SSORedirect = () => {
  const queryParam = new URLSearchParams(window.location.search);
  const code = queryParam.get('code');
  const { handleNavigate } = useRadNavigation();

  useEffect(() => {
    (async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(
          `${baseUrl}/api/github/gh_login?code=${code}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data?.token) {
          toast.error('There was an error');
          return;
        }

        const { token } = data;
        localStorage.setItem('accessToken', token);

        handleNavigate({ label: 'Dashboard', route: '/home' });
      } catch (err) {
        console.log('this is the error ==>', err);
      }
    })();
  }, [code, handleNavigate]);

  return (
    <LoadingContainer>
      <h1>Loading ...</h1>
    </LoadingContainer>
  );
};

export default SSORedirect;
