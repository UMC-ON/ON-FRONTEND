import styled from 'styled-components';

import { useRef } from 'react';
const DefaultCheckBox = ({
  before,
  after,
  wrapperStyle = {},
  checkBoxStyle = {},
  onChange = () => {},
  name = {},
  defaultValue = false,
}) => {
  let checked = useRef(defaultValue);
  return (
    <CheckBoxWrapper style={wrapperStyle}>
      <TextDiv>{before}</TextDiv>

      <StyledCheckBox
        type="checkBox"
        style={checkBoxStyle}
        name={name}
        onClick={() => {
          checked.current = !checked.current;
          console.log(`디폴트 체크박스 체크 ${checked.current}`);
          onChange({
            target: {
              name: name,
              value: checked.current,
            },
          });
        }}
        defaultChecked={defaultValue}
      />
      <TextDiv>{after}</TextDiv>
    </CheckBoxWrapper>
  );
};

export default DefaultCheckBox;

const CheckBoxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;

  flex-wrap: nowrap;
  color: #b2b2b2;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;

  height: 18px;
  width: auto;
`;

const blueCheck = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
  >
    <path
      d="M1 5.09091C1.95711 5.70736 3.46442 8.77393 4.24007 9.59925C4.43597 9.80769 4.70767 10.24 4.81569 9.82893C5.3072 7.95844 6.08611 6.1162 6.98533 4.40627C7.44924 3.52412 8.27273 1.81818 9 1"
      stroke="#BFD8E5"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>`;
const purpleCheck = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
  >
    <path
      d="M1 5.09091C1.95711 5.70736 3.46442 8.77393 4.24007 9.59925C4.43597 9.80769 4.70767 10.24 4.81569 9.82893C5.3072 7.95844 6.08611 6.1162 6.98533 4.40627C7.44924 3.52412 8.27273 1.81818 9 1"
      stroke="#CBCDE9"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>`;
const encodedBlueCheck = encodeURIComponent(blueCheck)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');

const encodedPurpleCheck = encodeURIComponent(purpleCheck)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const StyledCheckBox = styled.input`
  appearance: none;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 2px solid ${(props) => props.style.color || '#bfd8e5'};
  padding: 0 4px;
  background-color: white;
  &:checked {
    background: ${(props) =>
      props.style.color === '#BFD8E5'
        ? `url('data:image/svg+xml,${encodedBlueCheck}') no-repeat center
      white`
        : `url('data:image/svg+xml,${encodedPurpleCheck}') no-repeat center
      white`};
  }
`;

const TextDiv = styled.div`
  width: auto;
  white-space: nowrap;
`;
