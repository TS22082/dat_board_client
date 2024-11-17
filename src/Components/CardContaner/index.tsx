import styled from 'styled-components';
import { CardContainerProps } from '../../sys/types.ts';

const CardContainer = styled.div<CardContainerProps>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  border: ${(props) =>
    props.theme === 'light' ? '1px solid black' : '2px solid white'};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default CardContainer;
