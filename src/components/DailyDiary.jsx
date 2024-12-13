import React from 'react';
import styled from 'styled-components';

const StoredDiary = ({ diaries }) => {

  return (
    <>
      {diaries && diaries.map((item, index) => (
        <DailyDiary key={index}>
          <Content>{item.content}</Content>
          <Date>{item.diaryDate}</Date>
          <DDay>{`D${item.writtenDday === 0 ? "-Day" : item.writtenDday < 0 ? ` + ${Math.abs(item.writtenDday)}` : ` - ${item.writtenDday}`}`}</DDay>
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
  width: 42px;
  height: 18px;
  border-radius: 9px;
  background: ${props => props.theme.blueGra};
  color: white;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 7.5em;
`;

const Content = styled.p`
  padding: 20px;
  color: #5c5c5c;
  font-size: 1rem;
  flex-grow: 1;
`;

const Date = styled.p`
  font-size: 11px;
  margin: 10px;
  margin-left: 0px;
  font-weight: 600;
  color: #838383;
  position: absolute;
  bottom: 2px;
  right: 4px; /* Date를 아래로 배치하고 왼쪽에 고정 */
`;
