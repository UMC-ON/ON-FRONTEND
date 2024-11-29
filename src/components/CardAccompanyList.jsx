import React from 'react';
import styled from 'styled-components';

import personIcon from '../assets/images/person_icon.svg';
import calendarIcon from '../assets/images/calendar_icon.svg';
import plusIcon from '../assets/images/plus_icon.svg';
import placeIcon from '../assets/images/place_icon.svg';
import defaultImg from '../assets/images/bannerDefault.svg';

import { useNavigate } from 'react-router-dom';


const CardAccompanyList = ({ color, cards }) => {
  function formatDateToMD(dateStr) {
    const dateObj = new Date(dateStr);
    
    const month = dateObj.getMonth() + 1; 
    const day = dateObj.getDate();
    
    return `${month}/${day}`;
  }

  const navigate = useNavigate();

  return (
    <CardListContainer>
  {(cards && cards.length > 0) ? (
    cards.map((card, index) => (
      <CardContainer key={index} onClick={() => {
        const id = card.postId ?? card.companyPostId;
        if (id) {
          window.location.href = `/accompany/detail/${id}`;
        }
      }}>
        <Card $width={cards.length === 1 ? "18rem" : undefined} >
          {card.postImg ? (
            <CardImage src={card.postImg} />
          ) : (
            <CardImage src={defaultImg} />
          )}
          <GreyCard color={color}>
            <SmallSpace/>
            <Left>
              <CardIcon src={personIcon} />
              <SmallGreyText $size="15px" $padding="6px">{card.nickname}</SmallGreyText>
              <SmallGreyText>·</SmallGreyText>
              <SmallGreyText>{card.age}세</SmallGreyText>
              <SmallGreyText>·</SmallGreyText>
              {card.gender === 'FEMALE' ? (
                <SmallGreyText>여</SmallGreyText>
              ) : (
                <SmallGreyText>남</SmallGreyText>
              )}
            </Left>
            <Left>
              <CardName>{card.title}</CardName>
            </Left>

            <BigSpace/>
        
            <Left2>
              <CardIcon src={calendarIcon} />
              {card.startDate === card.endDate ? (
                <GreyText>{formatDateToMD(card.startDate)}</GreyText>
              ) : (
                <GreyText>
                  {formatDateToMD(card.startDate)}
                  {/* ~{formatDateToMD(card.endDate)} */}
                </GreyText>
              )}
              <Padding />
              <CardIcon src={plusIcon} />
              <GreyText>{card.currentRecruitNumber}/{card.totalRecruitNumber}</GreyText>
              <Padding />
              <CardIcon src={placeIcon} />
              {/* <GreyText>{card.travelArea[0]}</GreyText> */}
            
              {card.travelArea[1] ? (
                <GreyText $left="0px">{card.travelArea[0]}, {card.travelArea[1]}</GreyText>
              ) : <GreyText>{card.travelArea[0]}</GreyText>}
            </Left2>
          </GreyCard>
        </Card>
      </CardContainer>
    ))
  ) : 
    <LeftContainer>
      <LeftSpace/>
      <SubText>아무것도 없습니다.</SubText>
    </LeftContainer>
            }
</CardListContainer>
  );
};

export default CardAccompanyList;

const SmallSpace = styled.div`
  margin-top: 0.5rem;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const LeftSpace = styled.div`
  margin-left: 0.65rem;
`;

const SubText = styled.div`
  color: #5C5C5C;
  font-family: 'Inter';
  font-size: 1em;
`;

const BigSpace = styled.div`
  margin-top: 1.5rem;
`;

const Padding = styled.div`
  padding-left: 20px;
`;

const CardListContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 1.3rem;
`;

const CardContainer = styled.div`
  display: inline-block; 
  margin: 0;
  min-width: 10rem;
  margin-right: 8.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: ${props => props.$width || "17.1rem"};
  height: 17rem; 
`;

const CardImage = styled.img`
  width: 100%;
  height: 50%;        
  object-fit: cover;   
  aspect-ratio: 16/9;
  margin: 0;
  padding: 0;
  display: block;
`;

const CardIcon = styled.img`
  width: 21px;
  height: 21px;
  margin-top: 2px;
`;

const CardName = styled.p`
  font-size: 17px;
  padding: 12px 0 7px 0;
  margin: 0;
  font-weight: bold;
  padding-bottom: 7px;
  color: #1e1e1e;

  width: 80%;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const SmallGreyText = styled.p`
  font-size: ${props => props.$size || "12px"};
  padding-left: 6px;
  padding-top: ${props => props.$padding || "8px"};
  color: #5c5c5c;

  display: inline-block; 
  max-width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.02em;
`;

const GreyText = styled.p`
  font-size: 15px;
  padding-left: ${props => props.$left || "6px"};
  padding-top: 2px;
  padding-bottom: 9px;
  color: #5c5c5c;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 20%;
  padding-right: 20px;
`;

const GreyCard = styled.div`
  background: linear-gradient(135deg, #D6EBFF, #C2C7FF);
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; 
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
`;

const Left2 = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  margin-bottom: 15px;
`;
