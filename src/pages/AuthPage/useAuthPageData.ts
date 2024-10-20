const useAuthPageData = () => {
  const redirectToGithub = () => {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

    window.localStorage.setItem('redirectUri', url);

    window.location.href = url;
  };

  return { redirectToGithub };
};

export default useAuthPageData;
