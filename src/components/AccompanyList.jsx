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
      {datas && datas.length > 0 ? (
        datas.map((data, index) => (
          <RoundContainer
            key={index}
            onClick={() => goDetail(data.companyPostId)}
          >
            <ImageWrapper>
              {data.imageUrls[0] ? (
                <Image src={data.imageUrls[0]} />
              ) : (
                <Image src={defaultImg} />
              )}
            </ImageWrapper>

            <TextContainer>
              <CardName>{data.title}</CardName>

              <Left>
                <CardIcon
                  src={calendarIcon}
                  $top="1px"
                />
                <GreyText>{formatDateToMD(data.startDate)}</GreyText>
                <CardIcon
                  src={plusIcon}
                  $top="1px"
                />
                <GreyText>
                  {data.currentRecruitNumber}/{data.totalRecruitNumber}
                </GreyText>
                <CardIcon
                  src={placeIcon}
                  $top="1px"
                />
                <GreyText>{data.travelArea[0]}</GreyText>
              </Left>

              <Left>
                <GreyMiddleText>{data.content}</GreyMiddleText>
              </Left>

              <Left>
                <CardIcon
                  src={personIcon}
                  $top="2px"
                />
                <SmallGreyText>{data.nickname}</SmallGreyText>
                {!data.ageAnonymous && (
                  <>
                    <SmallGreyText>·</SmallGreyText>
                    <SmallGreyText>{data.age}세</SmallGreyText>
                  </>
                )}
                <SmallGreyText>·</SmallGreyText>
                <SmallGreyText>
                  {data.gender === 'FEMALE' ? '여' : '남'}
                </SmallGreyText>
              </Left>
            </TextContainer>
            <Overlay $isClosed={data.recruitCompletd} />
          </RoundContainer>
        ))
      ) : (
        <LeftContainer>
          <LeftSpace />
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // width: 20vh;
  line-height: 1.5vh;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 99%;
  height: 4vh;
`;

const RoundContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  border-radius: 20px;
  background: linear-gradient(90deg, #e7ebed, #ffffff);
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

const ImageWrapper = styled.div`
  width: 16vh;
  height: 16vh;
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
  margin-left: 11px;
  display: flex;
  height: 130px;
  flex-direction: column;
  box-sizing: border-box;
  margin-right: 15px;
`;

const CardName = styled.p`
  font-size: 1rem;
  padding: 0px;
  font-weight: bold;
  text-align: left;
  line-height: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #363636;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 23vh;
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
