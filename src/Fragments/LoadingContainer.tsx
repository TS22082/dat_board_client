import styled from 'styled-components';
import { useAppStateContext } from '../context/useAppStateContext.ts';

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${() => {
    const { theme } = useAppStateContext();
    return theme === 'dark' ? 'black' : 'white';
  }};
`;

export default LoadingContainer;
