import React from "react";
import styled, { css } from "styled-components";

type TooltipType = {
  text: string;
  position: "up" | "down" | "left" | "right";
  children: React.ReactNode;
};

const ToolTip: React.FC<TooltipType> = ({ text, position, children }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipText position={position}>{text}</TooltipText>
    </TooltipContainer>
  );
};

export default ToolTip;

// Styled components
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.span<{ position: "up" | "down" | "left" | "right" }>`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
  width: 120px;

  &::after {
    content: "";
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

  ${({ position }) => {
    switch (position) {
      case "down":
        return css`
          top: 125%;
          left: 50%;
          transform: translateX(-50%);

          &::after {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-color: black transparent transparent transparent;
          }
        `;
      case "left":
        return css`
          top: 50%;
          right: 125%;
          transform: translateY(-50%);

          &::after {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            border-color: transparent transparent transparent black;
          }
        `;
      case "right":
        return css`
          top: 50%;
          left: 125%;
          transform: translateY(-50%);

          &::after {
            top: 50%;
            left: 0;
            transform: translateY(-50);
            border-color: transparent black transparent transparent;
          }
        `;
      case "up":
      default:
        return css`
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);

          &::after {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-color: transparent transparent black transparent;
          }
        `;
    }
  }}
`;
