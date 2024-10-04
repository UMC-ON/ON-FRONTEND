import React from 'react';
import styled from 'styled-components';

import bubbleIcon from '../assets/images/bubble.svg'
import { useNavigate } from 'react-router-dom';

import { showDate } from './Common/InfoExp';

const CommunityCardList = ({ free, cards }) => {

  const navigate = useNavigate();

  return (
    <div>
      {cards.map((card, index) => (
        <ImgContainer $free={free}
        key={index} 
        onClick={() => {
          const path = free
            ? `./community/general/detail/${card.postId}`
            : `./community/info/detail/${card.postId}`;
          
          navigate(path, {
            state: { value: card.postId },
          });
        }}
      >
          <PaddingTop />
          <Stripe $free={free}>
            <TextTopLeft>{card.title}</TextTopLeft>
            {free ?
            <TextTopRight>{showDate(card.postTime)}</TextTopRight>
            :null
            }
          </Stripe>
          <BetweenContainer>
            <TextContainer>
              <TextMiddle>
                {card.content}
              </TextMiddle>
            </TextContainer>
            {card.postImg ?
            <ImageRight src={card.postImg} />:
            null
            }
          </BetweenContainer>
        </ImgContainer>
      ))}
    </div>
  );
};

export default CommunityCardList;

const infoContainerData = `
  <svg width="328" height="162" viewBox="0 0 328 162" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.5" y="1.5" width="325" height="159" rx="16.5" fill="#BFD8E5" fill-opacity="0.3" stroke="url(#paint0_linear_3630_13823)" stroke-width="3"/>
<defs>
<linearGradient id="paint0_linear_3630_13823" x1="0" y1="0" x2="128.643" y2="260.463" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>
`;
const encodedInfo = encodeURIComponent(infoContainerData).replace(/'/g, "%27").replace(/"/g, "%22");

const freeContainerData = `
  <svg width="328" height="162" viewBox="0 0 328 162" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.5" y="1.5" width="325" height="159" rx="16.5" fill="#CBCDE9" fill-opacity="0.3" stroke="url(#paint0_linear_3630_13890)" stroke-width="3"/>
<defs>
<linearGradient id="paint0_linear_3630_13890" x1="0" y1="0" x2="128.643" y2="260.463" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>
`;
const encodedFree = encodeURIComponent(freeContainerData).replace(/'/g, "%27").replace(/"/g, "%22");


const ImgContainer = styled.div`
  background-image: ${props => props.$free
    ? `url('data:image/svg+xml,${encodedFree}')`
    : `url('data:image/svg+xml,${encodedInfo}')`};
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  width: 80%;
  aspect-ratio: 1 / 0.49; 
  margin: 0 auto;
  margin-bottom: 15px;
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
`;

const PaddingTop = styled.div`
  padding-top: 13px;
`;

const Stripe = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
`;

const TextTopLeft = styled.div`
  color: #363636;
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  padding: 5px;
  padding-left: 20px;

  white-space: nowrap;         
  overflow: hidden;            
  text-overflow: ellipsis;    
  width: 80%;                
`;

const TextTopRight = styled.div`
  color: #7A7A7A;
  font-size: 0.8em;
  text-align: right;
  padding: 5px;
  padding-right: 15%;
`;

const BetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; 
  padding: 5px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextMiddle = styled.div`
  color: #838383;
  font-size: 12px;
  text-align: left;
  line-height: 1.3em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 5px;
  height: 4em;
`;

const InlineTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  margin-left: 3px;
`;

const TextBottomLeft = styled.div`
  color: #7A7A7A;
  font-size: 0.7em;
  top: 13.8vh;
  left: 2.5vh;
  text-align: right;
`;

const IconBottomLeft = styled.img`
  margin-left: 10px;
`;

const TextBottomLeft2 = styled.div`
  color: #ffffff;
  font-size: 0.7em;
  margin-left: 3px;
`;

const ImageRight = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  margin-right: 20px;
  padding-top: 3px;
`;

