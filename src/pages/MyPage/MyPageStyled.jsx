import styled from 'styled-components';
import theme from '../../styles/theme';

export const MyPageLayout = styled.div`
  width: 100vw;
  max-width: 480px;
  display: flex;
  box-sizing: border-box;
  padding: 61px 1.5rem 0px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
`;

export const PasswordContainer = styled.article`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const PasswordTextInput = styled.input`
  width: 100%;
  height: 2rem;
  border: none;
  border-bottom: solid #b0b0b0 1px;
  background: none;
  color: #838383;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  ::placeholder {
    color: #838383;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const ConfirmButton = styled.div`
  display: flex;
  border-radius: 3.75rem;
  background: ${theme.purpleGra};
  width: 100%;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const MyPosts = styled.article`
  margin-top: 1.1rem;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(214, 235, 255, 0.5) 0%,
    rgba(194, 199, 255, 0.5) 100%
  );
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  height: 3.1875rem;
  flex-shrink: 0;
  display: flex;
  padding: 0 21px;
  align-items: center;
  gap: 6px;
  span {
    color: #5c5c5c;
    font-family: Inter;
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const MyInfoTitle = styled.p`
  margin-top: 2.5rem;
  width: 100%;
  color: #3e73b2;
  font-family: Inter;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
`;
export const MyInfoWrapper = styled.article`
  width: 100%;
  padding: 0 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const InfoContainer = styled.section`
  display: grid;
  grid-template-areas:
    'header edit'
    'textbox textbox';
  place-items: center start;
  grid-template-columns: auto 1fr;
  margin: 1rem 0;
  gap: 5px;
`;

export const Title = styled.p`
  grid-area: header;
  color: #000;
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  justify-self: start;
`;

export const EditBtn = styled.div`
  grid-area: edit;
  height: 1rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${(props) => props.color};
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
`;
export const TextInput = styled.input`
  grid-area: textbox;
  width: 100%;
  height: 2rem;
  border: none;
  border-bottom: solid #b0b0b0 1px;
  background: none;
  color: #838383;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  ::placeholder {
    color: #838383;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const SchoolNameSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 400;
`;

export const SchoolNameInput = styled.input`
  min-width: 0;
  height: 2rem;
  border: none;
  background: none;
  color: #838383;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  ::placeholder {
    color: #838383;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const SchoolNameBox = styled.div`
  grid-area: textbox;
  height: 2rem;
  width: 100%;
  border: none;
  border-bottom: 1px solid #b0b0b0;
  display: flex;
  justify-content: space-between;
`;

export const VerifyButton = styled.div`
  height: 1rem;
  padding: 1px 0.5rem;
  box-sizing: border-box;
  margin-left: 10px;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${theme.purpleGra};
  text-align: center;
  color: white;
  font-family: Inter;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
`;

export const TypeRadio = styled.input.attrs({ type: 'radio' })`
  vertical-align: middle;
  appearance: none;
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  border: 0.5px solid #cfcfcf;
  border-radius: 40%;
  margin: 0 1px;
  &:checked {
    background: ${theme.purpleGra};
  }
`;
export const TypeLabel = styled.label`
  color: #b2b2b2;
  font-family: Inter;
  font-size: 0.5625rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0 1px;
`;

export const RadioBox = styled.div`
  height: 0.75rem;
  align-self: center;
  display: flex;
  align-items: flex-start;
  justify-self: end;
`;

export const Country = styled.div`
  margin-left: 0.44rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  padding: 0 0.5rem;
  background: ${theme.blueGra};
  color: #fff;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
`;

export const InfoBox = styled.div`
  grid-area: textbox;
  height: 2rem;
  width: 100%;
  border: none;
  border-bottom: 1px solid #b0b0b0;
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.37rem;
  box-sizing: border-box;
  span {
    color: #838383;
    font-family: Inter;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const Background = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 152px;
`;
