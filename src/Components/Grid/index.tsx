import styled from "styled-components";
import React from "react";

type GridPropTypes = {
  children: React.ReactNode;
};

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const Grid: React.FC<GridPropTypes> = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>;
};

export default Grid;
