import styled from 'styled-components';
import { AppContainerProps } from '../../sys/types.ts';

const AppContainer = styled.div<AppContainerProps>`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: ${(props) => (props.theme === 'light' ? 'white' : 'black')};
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
`;

export default AppContainer;
