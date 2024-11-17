import React from 'react';
import styled from 'styled-components';
import { useAppStateContext } from '../../context/useAppStateContext.ts';
import { ToggelCircleProps, ToggleSwitchProps } from '../../sys/types.ts';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleSwitch = styled.div<ToggleSwitchProps>`
  width: 44px;
  height: 24px;
  background-color: ${({ theme }) => (theme === 'dark' ? 'white' : 'black')};
  border-radius: 25px;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
`;

const ToggleCircle = styled.div<ToggelCircleProps>`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => (theme === 'dark' ? 'black' : 'white')};
  border-radius: 50%;
  position: absolute;
  left: ${({ isOn }) => (isOn ? '22px' : '2px')};
  transition: left 0.3s;
`;

const Label = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  label: [string, string]; // Array with two labels, one for off and one for on
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, label }) => {
  const { theme } = useAppStateContext();
  return (
    <ToggleContainer onClick={handleToggle}>
      <ToggleSwitch theme={theme}>
        <ToggleCircle theme={theme} isOn={isOn} />
      </ToggleSwitch>
      <Label>{isOn ? label[1] : label[0]}</Label>
    </ToggleContainer>
  );
};

export default Switch;
