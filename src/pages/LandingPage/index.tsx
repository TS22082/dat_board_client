import Button from '../../Components/Button';
import CardContainer from '../../Components/CardContaner';
import useLandingPageData from './useLandingPageData.tsx';

const LandingPage = () => {
  const { loginToGithub } = useLandingPageData();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CardContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            padding: '100px',
            flexDirection: 'column',
          }}
        >
          <h2>Welcome to Dat Dash</h2>
          <Button width="200px" onClick={loginToGithub}>
            Sign in with GitHub
          </Button>
        </div>
      </CardContainer>
    </div>
  );
};

export default LandingPage;
