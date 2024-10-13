import useAuthPageData from "./useAuthPageData";

const AuthPage = () => {
  const { redirectToGithub } = useAuthPageData();

  return (
    <div>
      <h1>Welcome to the Auth Page</h1>
      <button onClick={redirectToGithub}>Sign in with GitHub</button>
    </div>
  );
};

export default AuthPage;
