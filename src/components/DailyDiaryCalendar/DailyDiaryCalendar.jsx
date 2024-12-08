import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import ko from "date-fns/locale/ko";
import * as s from './DailyDiaryCalendarStyled.jsx';

const DateRangePicker = ({ onApply }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleApply = () => {
    if (selectedDate) {
      onApply(selectedDate);
    }
  };

  const handleReset = () => {
    setSelectedDate(null);
  };

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <s.CalendarHeader>
      <s.HeaderButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </s.HeaderButton>
      <s.HeaderTitle>
        {moment(date).format('YYYY.MM')}
      </s.HeaderTitle>
      <s.HeaderButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </s.HeaderButton>
    </s.CalendarHeader>
  );

  return (
    <s.CompanyCalendar>
      <div className="date-range-picker">
        <div className='top-header'>
          <p style={{fontSize: "12px", color: "#CCCCCC", marginTop: "10px"}}></p>
        </div>
        <s.StyledDatePicker>
          <DatePicker
            locale={ko}
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={renderCustomHeader}
            maxDate={new Date()}
          />
        </s.StyledDatePicker>
        <s.Controls>
          <s.ResetButton onClick={handleReset}>초기화</s.ResetButton>
          <s.ApplyButton disabled={!selectedDate} onClick={handleApply}>
            적용
          </s.ApplyButton>
        </s.Controls>
      </div>
    </s.CompanyCalendar>
  );
};

export default DateRangePicker;
