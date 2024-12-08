import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import compas from '../assets/images/compasIcon.svg';
import profile from '../assets/images/profileIcon.svg';
import empty_star from '../assets/images/empty_star.svg';
import filled_star from '../assets/images/filled_star.svg';
import defaultImg from '../assets/images/bannerDefault.svg';

import { showDate } from '../components/Common/InfoExp';
import { GET_CURRENT_INFO } from '../api/urls';
import { getData, postData, putData } from '../api/Functions';
const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const ItemList = ({ items }) => {
  let userInfo = useSelector((state) => state.user.user);
  const [scrappedMarketPostIds, setScrappedMarketPostIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrappedPosts = async () => {
      try {
        // Check if userInfo is available
        if (!userInfo || !userInfo.id) {
          //.error('User info is not available');
          return;
        }

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

        // Extract marketPostId from each marketPost object
        if (Array.isArray(response.data.content)) {
          const scrappedIds = response.data.content.map(
            (post) => post.marketPost.marketPostId,
          );
          setScrappedMarketPostIds(scrappedIds);
        } else {
          //console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        //console.error('Error fetching scrapped posts:', error);
      }
    };

    fetchScrappedPosts();
  }, [userInfo]); // Ensure userInfo is available before making the request

  return (
    <>
      {items &&
        items.map((item, index, lastItemRef) => {
          const isCompleted = item.dealStatus === 'COMPLETE';
          const isScrapped = scrappedMarketPostIds.includes(item.marketPostId);

          return (
            <ItemDiv
              key={index}
              isCompleted={isCompleted}
              ref={index === items.length - 1 ? lastItemRef : null}
            >
              <Photo
                src={item.imageUrls.length > 0 ? item.imageUrls : defaultImg}
                onClick={() => navigate(`/sell/${item.marketPostId}`)}
              />
              <Information>
                <StarContainer
                  marketPostId={item.marketPostId}
                  isFilled={isScrapped} // Pass isScrapped as isFilled prop
                  scrappedMarketPostIds={scrappedMarketPostIds} // Pass the whole array
                  setScrappedMarketPostIds={setScrappedMarketPostIds} // Pass the state updater function
                />
                <Description
                  onClick={() => navigate(`/sell/${item.marketPostId}`)}
                >
                  <Title>{item.title}</Title>
                  <br />
                  <State
                    how={item.dealType === 'DIRECT' ? '직거래' : '택배거래'}
                    now={
                      item.dealStatus === 'COMPLETE' ? '거래 완료' : '거래 가능'
                    }
                    isCompleted={isCompleted}
                  />
                  <LocationAndUser>
                    <Place>
                      <img
                        src={compas}
                        style={{
                          width: '14.4px',
                          height: '14,4px',
                          marginRight: '3px',
                        }}
                      />
                      {item.currentCountry} {item.currentLocation}
                    </Place>
                    <User>
                      <Profile src={profile} />
                      {item.nickname}
                    </User>
                  </LocationAndUser>
                  <PriceTimeContainer>
                    <Price>{item.share ? '나눔' : `₩ ${item.cost}`}</Price>
                    <Time>{showDate(item.createdAt)}</Time>
                  </PriceTimeContainer>
                </Description>
              </Information>
            </ItemDiv>
          );
        })}
    </>
  );
};

const StarContainer = ({
  marketPostId,
  isFilled,
  setScrappedMarketPostIds,
}) => {
  const [isStarFilled, setIsStarFilled] = useState(isFilled);
  let userInfo = useSelector((state) => state.user.user);

  const toggleStar = async () => {
    try {
      if (isStarFilled) {
        // 스크랩 취소 요청
        await axios.delete(`${serverAddress}/api/v1/scrap/${marketPostId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          params: {
            marketPostId: marketPostId,
          },
        });

        // Remove marketPostId from scrappedMarketPostIds array
        setScrappedMarketPostIds((prevIds) =>
          prevIds.filter((id) => id !== marketPostId),
        );
      } else {
        // 스크랩 등록 요청
        await axios.post(
          `${serverAddress}/api/v1/scrap`,
          {
            marketPostId: marketPostId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('AToken')}`,
            },
          },
        );

        setScrappedMarketPostIds((prevIds) => [...prevIds, marketPostId]);
      }
      setIsStarFilled(!isStarFilled);
    } catch (error) {
      //console.error('스크랩 처리 중 오류 발생:', error);
    }
  };

  return (
    <Star
      src={isStarFilled ? filled_star : empty_star}
      onClick={toggleStar}
    />
  );
};

export default ItemList;

const ItemDiv = styled.div`
  margin: 0 auto;
  width: 90%;
  border-radius: 20px;
  background: linear-gradient(90deg, #e7ebed, #ffffff);
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  position: relative;
  text-align: left;
  opacity: ${({ isCompleted }) =>
    isCompleted ? 0.5 : 1}; /* 거래완료 시 불투명도 조절 */
`;

const Star = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin: 0.5em;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const Photo = styled.img`
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  padding: 0;
  width: 8.5rem;
  height: 8.5rem;
  min-width: 8.5rem;
  max-width: 8.5rem;
`;

const Information = styled.div`
  padding-top: 5px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-right: 15px;
`;

const Description = styled.div`
  padding: 0.6em;
  height: 60%;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #363636;
  white-space: nowrap; /* 줄 바꿈 없이 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨깁니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'으로 표시 */
  max-width: 160px;
`;

const Time = styled.span`
  color: #7a7a7a;
  font-size: 0.6em;
  margin-left: 8px;
  margin-top: 5px;
`;

const PriceTimeContainer = styled.div`
  width: 155px;
  display: flex; /* Flexbox를 사용하여 수평 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const StateWrapper = styled.p`
  color: #7a7a7a;
  font-size: 0.7em;
  margin-bottom: 5px;
`;

const StyledNow = styled.span`
  color: ${({ theme, isCompleted }) =>
    isCompleted ? theme.lightPurple : '#7A7A7A'};
`;

const State = ({ how, now, isCompleted }) => (
  <StateWrapper>
    {how} | <StyledNow isCompleted={isCompleted}>{now}</StyledNow>
  </StateWrapper>
);

const Price = styled.p`
  font-size: 19px;
  font-weight: 600;
  color: #3e73b2;
`;

const Profile = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 4px;
`;

const LocationAndUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2em;
  width: 100%;
  margin-bottom: 1vh;
`;

const Place = styled.p`
  font-size: 0.75em;
  display: flex;
  align-items: center;
  color: #838383;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-right: 10px;
`;

const User = styled.p`
  font-size: 0.75em;
  display: flex;
  align-items: center;
  color: #838383;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
