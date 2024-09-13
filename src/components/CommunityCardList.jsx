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
            <TextTopRight>{showDate(card.postTime)}</TextTopRight>
          </Stripe>
          <BetweenContainer>
            <TextContainer>
              <TextMiddle>
                {card.content}
              </TextMiddle>
              <InlineTextContainer>
                <TextBottomLeft>{card.writer}</TextBottomLeft>
                <IconBottomLeft src={bubbleIcon} />
                <TextBottomLeft2>{card.commentCount}</TextBottomLeft2>
              </InlineTextContainer>
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
  <svg width="344" height="133" viewBox="0 0 344 133" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M333.701 0L10.2994 2.95639e-05C10.2994 6.38731 5.68819 11.5652 0 11.5652V21.974C5.6882 21.974 10.2994 27.1519 10.2994 33.5392C10.2994 39.9265 5.6882 45.1044 0 45.1044V55.5131C5.6882 55.5131 10.2994 60.691 10.2994 67.0783C10.2994 73.4656 5.6882 78.6435 0 78.6435V89.0522C5.6882 89.0522 10.2994 94.2301 10.2994 100.617C10.2994 107.005 5.6882 112.183 0 112.183V121.435C5.6882 121.435 10.2994 126.613 10.2994 133L333.701 133C333.701 126.613 338.312 121.435 344 121.435V112.183C338.312 112.183 333.701 107.005 333.701 100.617C333.701 94.23 338.312 89.0521 344 89.0521V78.6435C338.312 78.6435 333.701 73.4656 333.701 67.0783C333.701 60.691 338.312 55.5131 344 55.5131V46.2609C338.312 46.2609 333.701 41.0829 333.701 34.6956C333.701 28.3084 338.312 23.1304 344 23.1304V11.5652C338.312 11.5652 333.701 6.38729 333.701 0Z" fill="#BFD8E6"/>
  </svg>
`;
const encodedInfo = encodeURIComponent(infoContainerData).replace(/'/g, "%27").replace(/"/g, "%22");

const freeContainerData = `
  <svg width="344" height="133" viewBox="0 0 344 133" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M333.701 0L10.2994 2.98023e-05C10.2994 6.38731 5.68819 11.5652 0 11.5652V21.974C5.6882 21.974 10.2994 27.1519 10.2994 33.5392C10.2994 39.9265 5.6882 45.1044 0 45.1044V55.5131C5.6882 55.5131 10.2994 60.691 10.2994 67.0783C10.2994 73.4656 5.6882 78.6435 0 78.6435V89.0522C5.6882 89.0522 10.2994 94.2301 10.2994 100.617C10.2994 107.005 5.6882 112.183 0 112.183V121.435C5.6882 121.435 10.2994 126.613 10.2994 133L333.701 133C333.701 126.613 338.312 121.435 344 121.435V112.183C338.312 112.183 333.701 107.005 333.701 100.617C333.701 94.23 338.312 89.0521 344 89.0521V78.6435C338.312 78.6435 333.701 73.4656 333.701 67.0783C333.701 60.691 338.312 55.5131 344 55.5131V46.2609C338.312 46.2609 333.701 41.0829 333.701 34.6956C333.701 28.3084 338.312 23.1304 344 23.1304V11.5652C338.312 11.5652 333.701 6.38729 333.701 0Z" fill="#CBCDE9"/>
  </svg>
`;
const encodedFree = encodeURIComponent(freeContainerData).replace(/'/g, "%27").replace(/"/g, "%22");

const infoStripeData = `
  <svg width="344" height="27" viewBox="0 0 344 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M344 0H0V8.97397C5.6882 8.97397 10.2994 14.1519 10.2994 20.5392C10.2994 22.9321 9.65222 25.1552 8.54368 27H334.845C334.114 25.4112 333.701 23.6076 333.701 21.6956C333.701 15.3084 338.312 10.1304 344 10.1304V0Z" fill="#F0F1FF"/>
  </svg>
`;
const encodedInfoStripe = encodeURIComponent(infoStripeData).replace(/'/g, "%27").replace(/"/g, "%22");


const freeStripeData = `
  <svg width="344" height="27" viewBox="0 0 344 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M344 0H0V8.97397C5.6882 8.97397 10.2994 14.1519 10.2994 20.5392C10.2994 22.9321 9.65222 25.1552 8.54368 27H334.845C334.114 25.4112 333.701 23.6076 333.701 21.6956C333.701 15.3084 338.312 10.1304 344 10.1304V0Z" fill="#E9F4FF"/>
  </svg>
`;
const encodedFreeStripe = encodeURIComponent(freeStripeData).replace(/'/g, "%27").replace(/"/g, "%22");

const ImgContainer = styled.div`
  background-image: ${props => props.$free
    ? `url('data:image/svg+xml,${encodedFree}')`
    : `url('data:image/svg+xml,${encodedInfo}')`};
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  width: 340px; 
  height: 130px; 
  margin: 0 auto;
  margin-bottom: 10px;
  filter: drop-shadow(8px 8px 8px rgba(0, 0, 0, 0.1));
`;

const PaddingTop = styled.div`
  padding-top: 13px;
`;

const Stripe = styled.div`
  background-image: ${props => props.$free 
    ? `url('data:image/svg+xml,${encodedInfoStripe}')`
    : `url('data:image/svg+xml,${encodedFreeStripe}')`};
  display: flex;
  justify-content: space-between;
  width: 340px; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
`;

const TextTopLeft = styled.div`
  color: #363636;
  font-size: 0.9em;
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
  padding-right: 15px;
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
  font-size: 0.8em;
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
