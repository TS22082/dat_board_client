import styled from "styled-components";
import React, { ReactNode } from "react";
import { useAppStateContext } from "../../context/useAppStateContext";

interface GridItemProps {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: ReactNode;
}

const getWidth = (span?: number) => {
  if (!span) return "100%"; // Default to full width if no span is provided
  const width = (span / 12) * 100;
  return `${width}%`;
};

const StyledGridItem = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;

export const GridItem: React.FC<GridItemProps> = ({
  sm,
  md,
  lg,
  xl,
  children,
}) => {
  const { screenSize } = useAppStateContext();

  const getGridWidth = () => {
    switch (screenSize) {
      case "sm":
        return getWidth(sm);
      case "md":
        return getWidth(md);
      case "lg":
        return getWidth(lg);
      case "xl":
        return getWidth(xl);
      default:
        return getWidth(sm);
    }
  };

  return <StyledGridItem width={getGridWidth()}>{children}</StyledGridItem>;
};
