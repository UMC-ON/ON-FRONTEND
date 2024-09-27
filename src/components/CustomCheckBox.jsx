import styled from 'styled-components';
import React from 'react';

function CustomCheckbox({ checked, onChange }) {
  return (
    <StyledCheckbox checked={checked} onClick={() => onChange({ target: { checked: !checked } })}>
      {checked && <Checkmark>✓</Checkmark>}
    </StyledCheckbox>
  );
}

export default CustomCheckbox;

const StyledCheckbox = styled.div`
  margin-top: 5px;
  margin-left: 15px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => (checked ? '#868EE8' : 'rgba(134, 142, 232, 0.2)')};
  border-radius: 30%;
  border: 2px solid #868EE8;
  transition: all 150ms;
  position: relative;
  font-weight: bold;
`;

const Checkmark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
`;
