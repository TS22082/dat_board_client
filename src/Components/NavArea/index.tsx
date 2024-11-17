import styled from 'styled-components';
import { NavAreaProps } from '../../sys/types.ts';

const NavArea = styled.nav<NavAreaProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-radius: 25px;
  border: ${(props) =>
    props.theme === 'dark' ? '1px solid white' : '1px solid black'};
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default NavArea;
