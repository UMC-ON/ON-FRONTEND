import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import PageHeader from '../components/PageHeader/PageHeader';
import ScrapListComponent from '../components/ScrapListComponent';
import LoadingScreen from '../components/LoadingScreen';

import nothing from '../assets/images/no_content.svg';

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

import { getData } from '../api/Functions';
import { GET_SCRAP } from '../api/urls';

function ScrapList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${serverAddress}/api/v1/scrap`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          params: {
            page: 0,
            size: 20,
            sort: 'DESC',
          },
        });

        // 응답 데이터 확인
        console.log('API response:', response.data.content);

        if (response.data.content) {
          setItems(response.data.content);
        } else {
          console.warn('스크랩 물품 데이터를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('스크랩 물품 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchItems();
  }, []); // 빈 배열을 추가하여 useEffect가 한 번만 실행되도록 함

  return (
    <>
      <PageHeader pageName={'스크랩한 물품'} />
      <Space />
      <br />
      <br />
      {items.length === 0 ? (
        <NoContentWrapper>
          <NoContentContainer>
            <NoContentImage
              src={nothing}
              alt="No content"
            />
          </NoContentContainer>
          <br />
          <br />
          <NoContentMessage>앗, 스크랩한 내역이 없어요!</NoContentMessage>
        </NoContentWrapper>
      ) : (
        <>
          <ScrapListComponent items={items} />
          <LastItemMessage>마지막 물품입니다.</LastItemMessage>
        </>
      )}
    </>
  );
}

export default ScrapList;

const Space = styled.div`
  margin-top: 7vh;
`;

const LastItemMessage = styled.div`
  text-align: center;
  margin: 20px;
  color: #b8b8b8;
  font-size: 13px;
`;

const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const NoContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContentImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const NoContentMessage = styled.p`
  font-size: 14px;
  color: #b8b8b8;
`;
