import styled from 'styled-components';
import React, { useState } from 'react';

import personIcon from '../assets/images/grey_person_icon.svg';
import calendarIcon from '../assets/images/grey_calendar_icon.svg';
import plusIcon from '../assets/images/grey_plus_icon.svg';
import placeIcon from '../assets/images/grey_place_icon.svg';
import defaultImg from '../assets/images/bannerDefault.svg';

import { useLocation, useNavigate } from 'react-router-dom';

function AccompanyList({ datas }) {
  const navigate = useNavigate();
  const goDetail = (postId) => {
    navigate(`./detail/${postId}`);
  };

  function formatDateToMD(dateStr) {
    const dateObj = new Date(dateStr);

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${month}/${day}`;
  }

    return (
      <>
        {(datas && datas.length > 0) ? (
          datas.map((data, index) => (
            <RoundContainer key={index} onClick={() => goDetail(data.companyPostId)}>
              <ImageWrapper>
                {data.imageUrls[0] ? 
                  <Image src={data.imageUrls[0]} /> : 
                  <Image src={defaultImg} />
                }
              </ImageWrapper>
              
              <TextContainer>
                <CardName>{data.title}</CardName>
    
                <Left>
                  <CardIcon src={calendarIcon} $top="1px"/>
                  <GreyText>{formatDateToMD(data.startDate)}</GreyText>
                  <CardIcon src={plusIcon} $top="1px"/>
                  <GreyText>{data.currentRecruitNumber}/{data.totalRecruitNumber}</GreyText>
                  <CardIcon src={placeIcon} $top="1px"/>
                  <GreyText>{data.travelArea[0]}</GreyText>
                </Left>
    
                <Left>
                  <GreyMiddleText>{data.content}</GreyMiddleText>
                </Left>
    
                <Bottom>
                  <CardIcon src={personIcon} $top="2px"/>
                  <SmallGreyText>{data.nickname}</SmallGreyText>
                  {!data.ageAnonymous && (
                    <>
                      <SmallGreyText>·</SmallGreyText>
                      <SmallGreyText>{data.age}세</SmallGreyText>
                    </>
                  )}
                  <SmallGreyText>·</SmallGreyText>
                  <SmallGreyText>{data.gender === 'FEMALE' ? '여' : '남'}</SmallGreyText>
                </Bottom>
              </TextContainer>
              <Overlay $isClosed={data.recruitCompletd} />
            </RoundContainer>
          ))
        ) : (
          <LeftContainer>
            <LeftSpace/>
            <SubText>아무것도 없습니다.</SubText>
          </LeftContainer>
        )}
      </>
    );
  }

export default AccompanyList;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
`;

const LeftSpace = styled.div`
  margin-left: 1.7rem;
`;

const SubText = styled.div`
  color: #5c5c5c;
  font-family: 'Inter-Bold';
  font-size: 1em;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
`;

const CardIcon = styled.img`
  width: 12px;
  height: 12px;
  padding-right: 0px;
  padding-top: ${(props) => props.$top || '0'};
`;

const GreyText = styled.p`
  font-size: 0.75em;
  padding-top: 2px;
  color: #7a7a7a;
  padding-right: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SmallGreyText = styled.p`
  font-size: 0.75em;
  padding-left: 4px;
  padding-top: 2px;
  padding-bottom: 13px;
  color: #7a7a7a;
  margin-left: 0px;
  display: inline-block;
  max-width: 88px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
`;

const GreyMiddleText = styled.p`
  font-size: 0.75em;
  color: #7a7a7a;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 기본은 두 줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5; /* 줄 간격 */
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99%;
  max-height: calc(1.5em * 2); /* 두 줄 이상 넘지 않음 */

  @media (max-width: 480px) { /* 작은 화면에서는 3줄 */
    -webkit-line-clamp: 2;
    max-height: calc(1.5em * 3);
  }
`;

const RoundContainer = styled.div`
  position: relative;
  width: 90%;
  border-radius: 20px;
  background: linear-gradient(90deg, #e7ebed, #ffffff);
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row; /* 내부 요소 가로 배치 */
  flex-wrap: nowrap; /* 줄 바꿈 방지 */
  align-items: center;
  margin: 0 auto 2vh auto;
  cursor: pointer;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* 남은 공간 채우기 */
  margin: 0 15px; /* 좌우 간격 */
  box-sizing: border-box;
  overflow: hidden; /* 내부 요소가 넘치지 않도록 설정 */
`;

const CardName = styled.p`
 font-size: 1rem;
  font-weight: bold;
  color: #363636;
  line-height: 1.2; /* 줄 높이 */
  margin: 10px 0;

  text-align: left; /* 왼쪽 정렬 */
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 내용 숨기기 */
  text-overflow: ellipsis; /* 넘치는 내용은 ...으로 표시 */
  max-width: 100%; /* 부모 컨테이너 너비를 초과하지 않음 */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgba(208, 214, 218, 0.5),
    rgba(231, 235, 237, 0.5),
    rgba(255, 255, 255, 0.5)
  );
  display: ${(props) => (props.$isClosed ? 'block' : 'none')};
  border-radius: 20px;
  z-index: 1;
`;
