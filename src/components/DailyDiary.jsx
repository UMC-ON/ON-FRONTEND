import React from 'react';
import styled from 'styled-components';

const StoredDiary = ({ diaries }) => {

  return (
    <>
      {diaries && diaries.map((item, index) => (
        <DailyDiary key={index}>
          <Content>{item.content}</Content>
          <DDay>{`D${item.writtenDday === 0 ? "-Day" : item.writtenDday < 0 ? ` + ${Math.abs(item.writtenDday)}` : ` - ${item.writtenDday}`}`}</DDay>
          <Date>{item.diaryDate}</Date>
        </DailyDiary>
      ))}
    </>
  );
}

export default StoredDiary;


const DailyDiary = styled.div`
  color: #838383;
  width: 90%;
  height: 130px;
  margin: 10px auto;
  border-radius: 15px;
  border: 0.5px solid ${props => props.theme.lightPurple};
  white-space: pre-wrap;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DDay = styled.div`
  width: 50px;
  height: 15px;
  border-radius: 9px;
  background: ${props => props.theme.blueGra};
  color: white;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 7.5em;
`;

const Content = styled.p`
  padding: 20px;
  color: #838383;
  font-size: 13px;
  flex-grow: 1;
`;

const Date = styled.p`
  font-size: 11px;
  margin: 10px;
  font-weight: 600;
  color: #838383;
  position: absolute;
  bottom: 2px;
  right: 5px; /* Date를 아래로 배치하고 왼쪽에 고정 */
`;
