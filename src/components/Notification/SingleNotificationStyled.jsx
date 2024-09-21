import styled from 'styled-components';

export const NotificationContainer = styled.div`
  width: 100%;
  height: 4rem;
  min-height: 50px;
  max-height: 60px;
  display: grid;
  padding: 0.7rem 1rem;
  box-sizing: border-box;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  position: relative;
  grid-column-gap: 0.2rem;
`;
export const NotificationTitle = styled.span`
  display: inline-block;
  overflow: hidden;
  color: #363636;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.28px;
  text-align: left;
`;

// export const NotificationTitle = styled.div`
//   display: flex;
//   flex-direction: row;
//   position: relative;
//   span {
//     display: inline-block;
//     overflow: hidden;
//     color: #363636;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     font-family: Inter;
//     font-size: 14px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: normal;
//     letter-spacing: 0.28px;
//     text-align: left;
//   }
// `;

export const NotificationText = styled.p`
  color: #363636;
  font-family: Inter;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  text-align: left;
  grid-column: 1 / 3;
`;

export const NotificationCircle = styled.img`
  position: absolute;
  right: 1rem;
  top: 0.3rem;
`;
