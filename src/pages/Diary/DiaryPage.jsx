import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BottomTabNav from '../../components/BottomTabNav/BottomTabNav';
import DiaryCalendar from '../../components/DiaryCalendar/DiaryCalendar';
import PageHeader from '../../components/PageHeader/PageHeader';
import DailyDiary from "../../components/DailyDiary";
import DDayCalendar from '../../components/DDayCalendar.jsx';
import DailyDiaryCalendar from "../../components/DailyDiaryCalendar/DailyDiaryCalendar.jsx";
import DiaryAlertModal from "../../components/DiaryAlertModal.jsx";

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
  const [dday, setDday] = useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [formattedDates, setFormattedDates] = useState({});


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
        setDiaries(response?.data?.diaryList);
        setDday(response?.data?.dday);
        setDateList(response?.data?.dateList);
        console.log(response.data.diaryList);
        console.log(userInfo);
        console.log(diaries);
      } catch (error) {
        console.error('다이어리 목록을 가져오는 중 오류 발생:', error);
      }
    };
    fetchDiaries();
  }, []);

  const handleDateChange1 = async (date) => {
    setSelectedDate1(date);
    setCalendarOpen(false);

  }

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
    setShowDatePicker(false);
    setNewDiaryVisible(true);
  };

  const handleAddDiaryClick = () => {
    if (dday === null) {  // dday가 null일 경우 모달을 띄운다
      setShowAlertModal(true);
    } else {
      setShowDatePicker(true);
      setNewDiaryVisible(false);
    }

  };

  const handleCalendarClick = () => {
    setShowDatePicker(false);
  };


  const handleSaveDiary = async () => {
    const formattedDate = moment(selectedDate2).format('YYYY-MM-DD');
  
    // 새로운 날짜와 데이터를 추가
    setFormattedDates((prevDates) => ({
      ...prevDates,
      [formattedDate]: newDiaryContent,
    }));
  
    try {
      const response = await postData(
        POST_DIARY,
        { 
          diaryDate: formattedDate, 
          content: newDiaryContent 
        },
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          'Content-Type': 'application/json',
        }
      );
      
      if (response) {
        console.log('Diary saved:', response.data);
        window.location.reload();
      } else {
        console.error('Error saving diary: no response.');
      }
    } catch (error) {
      console.error('Error saving diary:', error);
    }
  };
  
  
  
  return (
      <DiaryContainer>
      <PageHeader pageName="나의 일기" />
      <Content>
        <Information>
        <DDay>
          {dday !== null ? (
            <DDayText>
              {`D${dday === 0 ? "-Day" : dday < 0 ? ` + ${Math.abs(dday)}` : ` - ${dday}`}`}
            </DDayText>
          ) : (
            <DDayCalendar
              selectedDate={selectedDate1}
              handleDateChange={handleDateChange1}
              setCalendarOpen={setCalendarOpen}
              datePickerRef={datePickerRef}
              userId={userInfo?.id}
            />
          )}
      </DDay>

        </Information><br/>
        <div style={{ height: "10%", marginTop: "60px" }} />
        {userInfo.dispatchedUniversity && (
          <div style={{ height: "100px", marginTop: "60px" }}>
            <SubText>나의 파견교</SubText>
            <SchoolContainer>
              <BigText>{userInfo.country},</BigText>
              <BigText style={{ color: "#3E73B2", marginLeft: "0.1em" }}>{userInfo.dispatchedUniversity}</BigText>
            </SchoolContainer>
          </div>
        )}
        <CalendarContainer>
          <DiaryCalendar diaries={diaries} dateList={dateList} />
        </CalendarContainer>
        <AddDiary onClick={handleAddDiaryClick}>
          <div>기록 남기기</div>
          <AddButton src={plus_button} />
        </AddDiary>
        {showAlertModal && (
          <DiaryAlertModal
            closeModal={() => setShowAlertModal(false)}
            line1="파견 날짜를"
            line2="일기 작성을 위해서는"
            line3="파견 날짜에 대한 정보가 필요합니다."
          />
        )}

        {showDatePicker && (
          <BottomTabLayout>
            <TopHeader>
              날짜
            </TopHeader>
            <Close src={closeIcon} onClick={handleCalendarClick} />
            <DailyDiaryCalendar onApply={handleDateChange2} />
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

        <DailyDiary diaries={diaries} formattedDates={formattedDates} />
        <Space />
      </Content>
      <BottomTabNav />
    </DiaryContainer>
  );
};

export default Diary;





const DiaryContainer = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter';
  overflow-y: auto;
  position: relative;
`;



const Content = styled.div`
  margin-top: 3%;
  @media (min-width: 370px) and (max-width: 385px) {
  margin-top: 8vh;
  }
`;


const Information = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;

  @media (max-width: 360px) {
    height: 35vh;
  }
`;



const DDay = styled.div`
  position: absolute; // 부모 요소를 기준으로 위치 고정
  width: 238px;
  height: 238px;
  transform: translate(-50%, -50%);
  top: 75%; 
  left: 50%;
  font-size: 1.2em !important;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #DCDFFF;
  z-index: 1;
  background-color: white;
  }
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
  @media (max-width: 385px) {
    padding-top: 2vh;
  }
`;

const SchoolContainer = styled.div`
  display: flex;
  justify-content: center;  // 수평 가운데 정렬
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
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
  margin-left: 5%;
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
  color: black;
  position: relative;
  width: 90%;
  margin: 10px auto;
`;

const NewDiary = styled.textarea`
  font-family: 'Inter';
  color: #838383;
  background-color: white;
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
  height: 50vh;
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
  @media (min-width: 365px) and (max-width: 380px) {
  height: 66%;
  }
  @media (max-width: 360px) {
  height: 60%;
}

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

const Space = styled.div`
  height: 100px;

`