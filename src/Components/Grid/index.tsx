import styled from 'styled-components';
import React from 'react';
import { GridPropTypes } from '../../sys/types.ts';

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Grid: React.FC<GridPropTypes> = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default Grid;
