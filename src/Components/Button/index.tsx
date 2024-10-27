import styled from 'styled-components';
import { ButtonProps } from '../../sys/types.ts';

const Button = styled.button<ButtonProps>`
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  background-color: black;
  border: none;
  color: white;
  width: ${({ width }) => width || '100px'};
`;

export default Button;
