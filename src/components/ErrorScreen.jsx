import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import errorimage from '../assets/images/error_plane.svg';

function ErrorScreen() {
  return (
    <>
      <CenterBox>
        <LoadCircle src={errorimage} />
        <Letters>서비스에 일시적인 문제가 발생했습니다.</Letters>
        <Letters>불편을 드려 죄송합니다.</Letters>
      </CenterBox>
    </>
  );
}

export default ErrorScreen;

const CenterBox = styled.div`
  margin: 0 auto;
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 480px;
`;

const LoadCircle = styled.img`
  margin-bottom: 40px;
`;

const Letters = styled.div`
  margin: 0 auto;
  font-size: 1rem;
  font-family: 'Inter';
  color: #7a7a7a;
  margin-bottom: 1vh;
  font-weight: bold;
`;
