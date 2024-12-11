import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ErrorScreen from '../components/ErrorScreen.jsx';
import compas from "../assets/images/compasIcon.svg";
import profile from "../assets/images/profileIcon.svg";
import empty_star from "../assets/images/empty_star.svg";
import filled_star from "../assets/images/filled_star.svg";
import defaultImg from '../assets/images/bannerDefault.svg';

import { showDate } from "../components/Common/InfoExp";
const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

const ScrapList = ({ items }) => {
  const [scrappedMarketPostIds, setScrappedMarketPostIds] = useState([]);
  const navigate = useNavigate();

  return (
    <>
      {items && items.map((item, index) => {
        const isCompleted = item.marketPost.dealStatus === "COMPLETE";
        const isScrapped = scrappedMarketPostIds.includes(item.marketPost.marketPostId);

        return (
          <ItemDiv key={index} isCompleted={isCompleted}>
            <Photo src={item.marketPost.imageUrls[0] ? item.marketPost.imageUrls[0] : defaultImg} />
            <Information>
              <StarContainer
                marketPostId={item.marketPost.marketPostId}
                isFilled={isScrapped}
                scrappedMarketPostIds={scrappedMarketPostIds}
                setScrappedMarketPostIds={setScrappedMarketPostIds}
              />
              <Description onClick={() => navigate(`../sell/${item.marketPost.marketPostId}`)}>
                <TitleTimeContainer>
                  <Title>{item.marketPost.title}</Title>
                  <Time>{showDate(item.marketPost.createdAt)}</Time>
                </TitleTimeContainer><br />
                <State how={item.marketPost.dealType === 'DIRECT' ? '직거래' : '택배거래'} now={item.marketPost.dealStatus === 'COMPLETE' ? '거래 완료' : '거래 가능'} isCompleted={isCompleted} />
                <LocationAndUser>
                  <Place><img src={compas} />{item.marketPost.currentCountry} {item.marketPost.currentLocation}</Place>
                  <User><Profile src={profile} />{item.marketPost.nickname}</User>
                </LocationAndUser>
                <Price>{item.marketPost.share ? '나눔' : `₩ ${item.marketPost.cost}`}</Price>
              </Description>
            </Information>
          </ItemDiv>
        );
      })}
    </>
  );
};



const StarContainer = ({ marketPostId, isFilled, scrappedMarketPostIds, setScrappedMarketPostIds }) => {
  const [isStarFilled, setIsStarFilled] = useState(!isFilled);


  const toggleStar = async () => {
    try {
        // 스크랩 취소 요청
        await axios.delete(`${serverAddress}/api/v1/scrap/${marketPostId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          params: {
            marketPostId: marketPostId
          }
    })
  
    setScrappedMarketPostIds(prevIds => prevIds.filter(id => id !== marketPostId));

  
      // Toggle the star state
      setIsStarFilled(!isStarFilled);
  
      // 페이지 새로 고침
      window.location.reload();
  
    } catch (error) {
      return <ErrorScreen />
    }
  };
  


  return (
    <Star
      src={isStarFilled ? filled_star : empty_star}
      onClick={toggleStar}
    />
  );
};



export default ScrapList;




const ItemDiv = styled.div`
  margin: 0 auto;
  width: 90%;
  border-radius: 20px;
  background: linear-gradient(90deg, #E7EBED, #FFFFFF);
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
  position: relative;
  text-align: left;
  opacity: ${({ isCompleted }) => isCompleted ? 0.5 : 1}; /* 거래완료 시 불투명도 조절 */
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
  width: 16vh;
  height: 18vh;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  padding: 0;
`;

const Information = styled.div`
  padding-top: 5px;
  padding-left: 10px;
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
`;

const Time = styled.span`
  color: #7A7A7A;
  font-size: 0.6em;
  margin-left: 8px;
  margin-top: 5px;
`;

const TitleTimeContainer = styled.div`
  width: 145px;
  display: flex; /* Flexbox를 사용하여 수평 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const StateWrapper = styled.p`
  color: #7A7A7A;
  font-size: 0.7em;
  margin-bottom: 5px;
`;

const StyledNow = styled.span`
  color: ${({ theme, isCompleted }) => isCompleted ? theme.lightPurple : '#7A7A7A'};
`;

const State = ({ how, now, isCompleted }) => (
  <StateWrapper>
    {how} | <StyledNow isCompleted={isCompleted}>{now}</StyledNow>
  </StateWrapper>
);

const Price = styled.p`
  font-size: 19px;
  font-weight: 600;
  color: #3E73B2;
`;


const Profile = styled.img`
  width: 1.2em;
  height: 1.2em;
  margin-right: 2px;
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
  display: inline-block;
  align-item: center;
  height: 20px;
  width: 100%; 
  font-size: 0.7em;
  align-items: center;
  margin-right: 10px;
  margin-top: 5px;
  color: #838383;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
`;

const User = styled.p`
  font-size: 0.7em;
  display: flex;
  align-items: center;
  color: #838383;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
