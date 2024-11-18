import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ko from 'date-fns/locale/ko';
import { getData, postData } from '../api/Functions';
import { GET_DIARY, POST_DDAY, POST_DIARY } from '../api/urls';

const DDayCalendarComponent = ({ selectedDate, handleDateChange, setCalendarOpen, datePickerRef }) => {
  const [storedDate, setStoredDate] = useState(null);

  useEffect(() => {
    if (storedDate) {
      handleDateChange(storedDate);
    }
  }, [storedDate, handleDateChange]);

  const handleDateSelect = async (date) => {
    setStoredDate(date);
    handleDateChange(date);

    // 선택된 날짜를 서버로 전송
    const formattedDate = moment(date).format('YYYY-MM-DD');
    try {
      const response = await postData(
        POST_DDAY,
        { "startDate": formattedDate }, // dday를 서버로 전송
        {
          Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          'Content-Type': 'application/json',
        }
      );
      console.log('디데이 저장 완료');
      console.log(localStorage.getItem('AToken'));
    } catch (error) {
      console.error('서버로 dday 전달 중 오류 발생:', error);
      console.log(dday);
    }
  };

  return (
    <DDayCalendar>
      <DatePickerWrapper>
        <DatePicker
          showPopperArrow={false}
          locale={ko}
          className="inputDate"
          placeholderText={'날짜 설정'}
          ref={datePickerRef}
          selected={storedDate || selectedDate}
          onChange={handleDateSelect}
          dateFormat="yyyy-MM-dd"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
          }) => (
            <HeaderContainer>
              <Arrow onClick={decreaseMonth}>{'<'}</Arrow>
              <HeaderDate>{moment(date).format('YYYY.MM')}</HeaderDate>
              <Arrow onClick={increaseMonth}>{'>'}</Arrow>
            </HeaderContainer>
          )}
          popperModifiers={{
            offset: {
              enabled: true,
              offset: '0px, 10px',
            },
          }}
          onClickOutside={() => setCalendarOpen(false)}
        />
      </DatePickerWrapper>
    </DDayCalendar>
  );
};

export default DDayCalendarComponent;

const DDayCalendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;

  .inputDate::placeholder {
    font-size: 30px;
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  .react-datepicker__header {
    background: white;
    border: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  background: white;
`;

const HeaderDate = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #3e73b2;
  margin: 0 4rem;
`;

const Arrow = styled.div`
  cursor: pointer;
  font-size: 18px;
`;
