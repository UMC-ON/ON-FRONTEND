import styled from 'styled-components';

export const SingleChatContainer = styled.div`
  display: grid;
  grid-template-areas:
    'pic nickname location time'
    'pic message message message';
  width: 100%;
  grid-template-columns: auto auto 1fr auto;
  place-items: center start;
  column-gap: 0.9rem;
  row-gap: 0.2rem;
  margin: 0.7rem 0;
`;

export const AccompanyPicture = styled.img`
  grid-area: pic;
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  background: lightgray 50% / cover no-repeat;
`;

export const NoTradePicture = styled.div`
  grid-area: pic;
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  background: lightgray 50% / cover no-repeat;
`;
export const Location = styled.div`
  grid-area: location;
  img {
    width: 17px;
    height: 17px;
  }
  display: flex;
  justify-self: end;
  color: #868ee8;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`;

export const TradePicture = styled.img`
  grid-area: pic;
  width: 3.125rem;
  height: 3.125rem;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  background: lightgray 50% / cover no-repeat;
`;

export const Nickname = styled.span`
  grid-area: nickname;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const Time = styled.span`
  grid-area: time;
  color: #7b7b7b;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Message = styled.span`
  grid-area: message;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;
