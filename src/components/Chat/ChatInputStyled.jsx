import styled from 'styled-components';
import theme from '../../styles/theme';

export const InputField = styled.article`
  width: 100%;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
  border-radius: 0.9375rem 0.9375rem 0rem 0rem;
  border: 1px solid #dfdfdf;
  background: #fff;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  box-sizing: border-box;
  z-index: 2;
`;

export const LoadingIndex = styled.div`
  z-index: 5;
`;

export const TextInputContainer = styled.div`
  height: auto;
  width: 90%;
  border: 0;
  position: relative;
  box-sizing: border-box;
  padding: 0.5rem 0.8rem 0.5rem 0.5rem;
  resize: none;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  column-gap: 0.2rem;
  align-content: center;
  border-radius: 0.875rem;
  background-color: #f6f6f6;
`;

export const TextInput = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 1rem;
  font-size: 0.875rem;
  max-height: 104px;

  background: none;
  color: black;
  border: 0;
  font-family: 'Inter';
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  resize: none;
  box-sizing: border-box;
`;

export const SendButton = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${theme.blueGra};
`;
