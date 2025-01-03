import styled from 'styled-components';

export const NotificationLayout = styled.div`
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  padding: 61px 1.94rem 1.94rem;
  align-items: center;
  flex-direction: column;
`;

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
