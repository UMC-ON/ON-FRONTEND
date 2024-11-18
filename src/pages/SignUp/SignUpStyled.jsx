import styled from 'styled-components';
import theme from '../../styles/theme';
import grayArrow from '../../assets/images/grayArrow.svg';
import lightBlueArrow from '../../assets/images/lightBlueArrow.svg';
//import radioButton_checked from '../../assets/images/radioButton_checked.svg';

export const FormPage = styled.section`
  background-color: rgb(250, 250, 250);
  box-sizing: border-box;
  height: auto;
  min-height: 100vh;
  width: 100%;
  padding: 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;

  & > .on_exp {
    color: black;
    opacity: 64%;
    font-size: 0.875rem;
  }
`;
export const Logo = styled.img`
  width: 3.0515rem;
  height: 1.875rem;
  flex-shrink: 0;
  margin: 0.81rem 0;
`;

export const BackButton = styled.button`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid gray;
  font-size: 0.625rem;
  color: black;
  opacity: 64%;
  outline: none;
  background-color: transparent;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover {
    outline: none;
  }
`;
export const ContentSection = styled.section`
  text-align: left;
  padding-top: 20px;
  width: 100%;
  & .radioBtn {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 1.8rem;
  }
  & .radioBtn > label {
    margin: 0 0.813rem;
  }
`;
export const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
`;
export const StyledH2 = styled.div`
  color: #3e73b2;
  font-family: Inter;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0.75rem 0;
`;
const grad = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9.5" fill="url(#paint0_linear_424_4500)" stroke="#E7E7E7"/>
<defs>
<linearGradient id="paint0_linear_424_4500" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>
`;
const encodedGrad = encodeURIComponent(grad)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');

export const RadioButton = styled.input`
  vertical-align: -0.188rem;
  appearance: none;
  border: max(2px, 0.1em) solid lightgray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  &:checked {
    background: url('data:image/svg+xml,${encodedGrad}') no-repeat center;
  }
`;

export const ButtonSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 100%;
`;

export const PurpleButton = styled.button`
  display: flex;
  width: 19.25rem;
  height: 3.375rem;
  padding: 0.9375rem 7.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 3.75rem;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &:focus {
    border: none;
    outline: none;
  }
  opacity: ${(props) => (props.disabled ? '50%' : '100%')};
  padding: 0.75rem;
`;
export const InputWrapper = styled.div`
  color: black;
  width: 100%;
  border-bottom: 1px solid #b0b0b0;
  justify-content: center;
  margin-top: 40px;
  & > .required::after {
    content: '*';
    color: #c2c7ff;
  }
`;

export const SchoolComboBox = styled.select`
  appearance: none;
  width: auto;
  border-radius: 0.8rem;
  outline: none;
  border: none;
  background: url(${lightBlueArrow}) no-repeat right 0.8rem center #f3f3f3;
  padding: 0.25rem 0.625rem;
  margin: 0.625rem 0;
  font-size: 0.75rem;
  color: #979797;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 1rem;
  }
`;

export const TransparentInput = styled.input`
  width: 100%;
  color: black;
  height: 2rem;
  margin-top: 0.2rem;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0 0.06rem;

  &:invalid {
    background-color: #ffc0cb91;
  }

  &::placeholder {
    font-size: 0.75rem;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GrayButton = styled.button`
  display: inline-flex;
  padding: 0.375rem 0.5625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 3.875rem;
  background: #ccc;
  color: #fff;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  margin: 0.25rem 0.25rem;
  &:focus {
    outline: none;
  }
`;

export const Explanation = styled.div`
  color: #5c5c5c;
  font-family: 'Baloo Bhaina 2';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 153.846% */
  text-align: justify;
`;
export const TwoColumnWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;

  & > * {
    width: calc((100%) / 2.5);
    flex: auto;
  }
`;

export const StyledComboBox = styled.select`
  color: black;
  height: 2.063rem;
  padding: 0.25rem;
  margin-top: 0.2rem;
  display: block;
  width: 100%;
  outline: none;
  border: none;
  appearance: none;
  background: url(${grayArrow}) no-repeat right;
  border-bottom: 1px solid #b0b0b0;
`;

export const CenterContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`;
