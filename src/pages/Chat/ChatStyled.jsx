import styled from 'styled-components';

export const ChatLayout = styled.div`
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  padding: 61px 0px 0px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column-reverse;
  overflow-y: auto;
  height: 100vh;
  /* height: 100%; */
  overflow-x: hidden;
  justify-content: space-between;
`;

export const BackgroundWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 6.125px;
  z-index: 0;
  display: flex;
`;

export const Background = styled.div`
  width: 100%;
  aspect-ratio: 390 / 539;
  background-image: url(${(props) => props.$backgroundimageurl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: 100%;
`;

export const TradeBackground = styled.div`
  width: 100vw;
  height: 21.625rem;
  position: fixed;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(
    180deg,
    rgba(110, 186, 255, 0) 0%,
    rgba(86, 150, 217, 0.1) 50%,
    rgba(62, 115, 178, 0.16) 100%
  );
`;

export const ChatWrapper = styled.div`
  z-index: 1;
  width: 100%;
  overflow-y: visible;
  padding: 2.25rem 1.5rem 0 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 7rem;
`;

// SentChatWrapper - 전체 컨테이너
export const SentChatWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end; // 오른쪽 정렬
  gap: 3px;
`;

export const Time = styled.div`
  font-size: 10px;
  color: #7a7a7a;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.65rem;
`;

// ReceivedChatWrapper - 전체 컨테이너
export const ReceivedChatWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start; // 왼쪽 정렬
  gap: 3px;
`;

// ChatWrapper - 전체 채팅 레이아웃
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
