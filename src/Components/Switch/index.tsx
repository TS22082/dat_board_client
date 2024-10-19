import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  cursor: pointer;
`;

const ToggleSwitch = styled.div<{ isOn: boolean }>`
  width: 50px;
  height: 24px;
  background-color: ${({ isOn }) => (isOn ? '#000' : '#ccc')};
  border-radius: 25px;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
`;

const ToggleCircle = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: ${({ isOn }) => (isOn ? '27px' : '3px')};
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
  return (
    <ToggleContainer onClick={handleToggle}>
      <ToggleSwitch isOn={isOn}>
        <ToggleCircle isOn={isOn} />
      </ToggleSwitch>
      <Label>{isOn ? label[1] : label[0]}</Label>
    </ToggleContainer>
  );
};

export default Switch;
