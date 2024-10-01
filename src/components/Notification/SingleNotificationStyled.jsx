import styled from 'styled-components';
import theme from '../../styles/theme';

export const NotificationContainer = styled.div`
  width: 100%;
  height: 6.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.94rem;
  box-sizing: border-box;
  position: relative;
  border-radius: 0.625rem;
  border: 0.5px solid #d9d9d9;
  justify-content: space-between;
  background: ${theme.blueGra};
  margin-top: 0.63rem;
  z-index: 1;
`;
export const NotificationTitle = styled.span`
  display: inline-block;
  overflow: hidden;
  color: #1e1e1e;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.02125rem;
  text-align: left;
`;

export const ReadNotificationContainer = styled.div`
  width: 100%;
  height: 6.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.94rem;
  box-sizing: border-box;
  position: relative;
  border-radius: 0.625rem;
  border: 0.5px solid #d9d9d9;
  justify-content: space-between;
  background: rgba(227, 227, 227, 0.6);
  margin-top: 0.63rem;
  z-index: 1;
`;
export const ReadNotificationTitle = styled.span`
  display: inline-block;
  overflow: hidden;
  color: #5c5c5c;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.02125rem;
  text-align: left;
`;

export const NotificationText = styled.p`
  height: 2rem;
  overflow: hidden;
  color: #5c5c5c;
  text-overflow: ellipsis;
  white-space: break-spaces;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-bottom: 0.5rem;
`;

export const NotificationCircle = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: #ffffff;
`;
