import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BottomTabNav from '../../components/BottomTabNav/BottomTabNav';
import DiaryCalendar from '../../components/DiaryCalendar/DiaryCalendar';
import PageHeader from '../../components/PageHeader/PageHeader';
import DailyDiary from "../../components/DailyDiary";
import DDayCalendar from '../../components/DDayCalendar.jsx';
import DailyDiaryCalendar from "../../components/DailyDiaryCalendar/DailyDiaryCalendar.jsx";

import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DiaryPage.css';
import ko from "date-fns/locale/ko";
import closeIcon from '../../assets/images/close_button.svg';
import plus_button from '../../assets/images/addButton.svg';
import { getData, postData } from '../../api/Functions';
import { GET_DIARY, POST_DDAY, POST_DIARY } from '../../api/urls';


const Diary = () => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [newDiaryVisible, setNewDiaryVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newDiaryContent, setNewDiaryContent] = useState('');
  const [diaries, setDiaries] = useState([]);
  const [dday, setDday] = useState(null); // state to hold the dday value
  const [dateList, setDateList] = useState([]);

  const datePickerRef = useRef(null);
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);


  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await getData(
          GET_DIARY,
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          }
        );
        setDiaries(response?.data?.result?.diaryList || []);
        setDday(response?.data?.result?.dday || null); // extract dday from response
        setDateList(response?.data?.result?.dateList || []);
        console.log(response?.data?.result);
      } catch (error) {
        console.error('다이어리 목록을 가져오는 중 오류 발생:', error);
      }
    };
    fetchDiaries();
  }, []);

  const handleDateChange1 = async (date) => {
    setSelectedDate1(date);
    setCalendarOpen(false);

    const dday = await getDdayFromServer(); // dday 값을 가져오는 함수 호출

    try {
      const response = await postData(
        POST_DDAY,
        { dday: dday }, // dday를 서버로 전송
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          'Content-Type': 'application/json',
        }
      );
      console.log('서버 응답:', response?.data);
    } catch (error) {
      console.error('서버로 dday 전달 중 오류 발생:', error);
    }
  };

  const getDdayFromServer = async () => {
    try {
      const response = await getData(
        GET_DIARY,
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
        }
      );
      return response?.data?.result.date || null; // 서버에서 dday 값을 반환
    } catch (error) {
      console.error('서버에서 dday 가져오는 중 오류 발생:', error);
      return null;
    }
  };
  

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    setShowDatePicker(false); // 달력 닫기
    setNewDiaryVisible(true); // 날짜 선택 후 일기 작성 컨테이너 보이기
  };

  const handleAddDiaryClick = () => {
    setShowDatePicker(true); // 달력을 엽니다.
    setNewDiaryVisible(false); // 일기 작성 컨테이너는 숨깁니다.
  };

  const handleCalendarClick = () => {
    setShowDatePicker(false); // 달력을 숨깁니다.
  };


  const handleSaveDiary = async () => {
    const formattedDate = moment(selectedDate2).format('YYYY-MM-DD');
  
    try {
      const response = await postData(
        POST_DIARY,
        { 
          date: formattedDate, 
          content: newDiaryContent 
        },
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          'Content-Type': 'application/json',
        }
      );
      
      if (response) {
        console.log('일기 저장 응답:', response.data);
        window.location.reload();
      } else {
        console.error('일기 저장 중 오류 발생: 응답이 없습니다.');
      }
      
    } catch (error) {
      console.error('일기 저장 중 오류 발생:', error);
    }
  };
  
  
  return (
    <>
      <DiaryContainer>
      <PageHeader pageName="나의 일기" />
      <Content>
        <Information>
          <DDay>
            {dday !== null ? (
              <DDayText>{`D${dday}`}</DDayText>
            ) : (
              <DDayCalendar
                selectedDate={selectedDate1}
                handleDateChange={handleDateChange1}
                setCalendarOpen={setCalendarOpen}
                datePickerRef={datePickerRef}
                userId= {userInfo?.id}
              />
            )}
          </DDay>
        </Information>
        <SubText>나의 {userInfo?.dispatchType === "DISPATCHED" ? '교환교' : '파견교'}</SubText>
          <SchoolContainer>
            <BigText>{userInfo?.country},</BigText>
            <BigText style={{ color: "#3E73B2", marginLeft: "0.1em" }}>{userInfo?.dispatchedUniversity}</BigText>
          </SchoolContainer>
        <CalendarContainer>
          <DiaryCalendar diaries={diaries} dateList={dateList} />
        </CalendarContainer>
        <AddDiary onClick={handleAddDiaryClick}>
          <div>기록 남기기</div>
          <AddButton src={plus_button} />
        </AddDiary>

        {showDatePicker && (
          <BottomTabLayout $height="50vh">
            <TopHeader>
              날짜
            </TopHeader>
            <Close src={closeIcon} onClick={handleCalendarClick} />
            <DailyDiaryCalendar onApply={handleDateChange2} /> {/* DailyDiaryCalendar에만 적용되는 상태 */}
          </BottomTabLayout>
        )}

        {newDiaryVisible && (
          <NewDiaryContainer>
            <NewDiary 
              placeholder="오늘 하루는 어땠나요?"
              value={newDiaryContent}
              onChange={(e) => setNewDiaryContent(e.target.value)} // 사용자가 입력한 내용을 상태에 저장
            />
            <Save onClick={handleSaveDiary}>저장하기</Save>
          </NewDiaryContainer>
        )}

        <DailyDiary diaries={diaries} />
      </Content>
      <BottomTabNav />
    </DiaryContainer>
    </>
  );
};

export default Diary;





const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter';
  overflow-y: auto; // 필요시 스크롤 허용
  position: relative; // 자식 요소가 absolute일 경우 기준이 될 수 있도록 설정
`;



const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 100px; // BottomTabNav 컴포넌트와의 간격을 확보
`;

const Information = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
  margin-bottom: 30px;
`;



const DDay = styled.div`
  position: absolute;
  width: 238px;
  height: 238px;
  top: 30%; 
  left: 17%;
  font-size: 1.2em !important;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: white; 

  /* ::before를 이용해 테두리 생성 */
  &::before {
    content: '';
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    padding: 10px; /* 테두리 두께 설정 */
    background: linear-gradient(to bottom right, #D6EBFF, #C2C7FF);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  /* 텍스트를 가상 테두리 위에 표시 */
  position: relative;
`;





const DDayText = styled.div`
  font-size: 45px;
  font-weight: 700;
  background: linear-gradient(90deg, #D6EBFF, #C2C7FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const SubText = styled.div`
  margin-top: 5em;

`;

const SchoolContainer = styled.div`
  display: flex;
  justify-content: center;  // 수평 가운데 정렬
  align-items: center;
  flex-wrap: wrap;
`;

const BigText = styled.div`
  margin-top: 1vh;
  color: ${props => props.color || '#000000'};
  font-weight: bold;
  font-family: 'Inter-Regular';
  font-size: 22px;
  margin-bottom: 3.5vh;
  margin-left: ${props => props.spacing || '0'};
`;

const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 0;
`;

const AddDiary = styled.div`
  width: 30%;
  height: 5vh;
  margin-left: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  background: ${props => props.theme.lightPurple};
  color: white;
  border-radius: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  cursor: pointer; // 클릭 가능하도록 커서 변경
`;

const AddButton = styled.img`
  width: 6vw;
  height: 3vh;
  margin-left: 0.5em;
`;

const NewDiaryContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 10px auto;
`;

const NewDiary = styled.textarea`
  font-size: 14px;
  width: 89%;
  height: 10vh;
  border-radius: 15px;
  border: 0.5px solid ${props => props.theme.lightPurple};
  white-space: pre-wrap;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 20px;
  &::placeholder {
    color: #838383;
    font-size: 13px;
    font-family: 'Inter';
  }
  outline: none;
  resize: none;
`;

const Save = styled.div`
  width: 70px;
  height: 20px;
  border-radius: 9px;
  background: ${props => props.theme.blueGra};
  color: white;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const BottomTabLayout = styled.div`
  width: 100%;
  max-width: 480px;
  height: ${props => props.$height || 'auto'};
  position: fixed;
  bottom: 0;
  border-radius: 14px 14px 0px 0px;
  border: 1px solid white;
  background: #ffffff;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px -1px 4px 0px #e2e2e2;
`;

const TopHeader = styled.div`
  font-size: 12px;
  color: #CCCCCC;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Close = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;