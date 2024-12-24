import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

import errorimage from '../assets/images/error_plane.svg';

function ErrorScreen() {
  const navigate = useNavigate();
  return (
    <>
      <CenterBox>
        <LoadCircle src={errorimage} />
        <ContentContainer>
          <Letters>서비스에 일시적인 문제가 발생했습니다.</Letters>
          <Letters>불편을 드려 죄송합니다.</Letters>
          <ButtonContainer>
            <Button onClick={() => location.reload(true)}>
              페이지 새로고침
            </Button>
            <Button onClick={() => navigate('/')}>홈으로</Button>
          </ButtonContainer>
        </ContentContainer>
      </CenterBox>
    </>
  );
}

export default ErrorScreen;

const CenterBox = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 480px;
  flex-grow: 0;
`;

const LoadCircle = styled.img`
  margin-bottom: 40px;
`;

const ContentContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 0.5rem;
`;

const Button = styled.div`
  background: ${theme.blueGra};
  height: 2.5rem;
  padding: 0 1.25rem;
  border-radius: 1.25rem;
  border: 1px solid #c2c7ff;
  text-align: center;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5rem;
  color: white;
  flex-grow: 1;
`;

const Letters = styled.div`
  margin: 0 auto;
  font-size: 1rem;
  font-family: 'Inter';
  color: #7a7a7a;
  margin-bottom: 1vh;
  font-weight: bold;
`;
