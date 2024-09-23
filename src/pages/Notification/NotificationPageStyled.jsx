import styled from 'styled-components';

export const NotificationLayout = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 480px;
  display: flex;
  box-sizing: border-box;
  padding: 61px 1.94rem 1.94rem;
  align-items: center;
  flex-direction: column;
`;

export const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(110, 186, 255, 0) 0%,
    rgba(86, 150, 217, 0.2) 50%,
    rgba(62, 115, 178, 0.32) 100%
  );
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  height: 25vh;
`;

// export const NotificationWrapper = styled.div`
//   width: 90%;
//   height: auto;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   box-sizing: border-box;
//   padding: 5px 0px 5px 0px;
//   border-radius: 14px;
//   border: 0.5px solid #fff;
//   background: rgba(227, 227, 227, 0.6);
//   box-shadow: 4px 4px 24px 0px rgba(62, 115, 178, 0.15);
//   margin: 1vh 0 3vh 0;
// `;

export const NotificationWrapper = styled.article`
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;

export const Line = styled.div`
  width: 100%;
  border-top: 1px solid white;
`;

export const NotificationEnd = styled.div`
  color: #b8b8b8;
  text-align: center;
  font-family: Inter;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 1.37rem;
`;

export const NoNotification = styled.div`
  align-self: center;
  height: 100vh;
  display: flex;
  align-items: center;
  margin-left: 25px;
  img {
    object-fit: cover;
    padding-bottom: 60px;
  }
`;
