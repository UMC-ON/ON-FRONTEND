import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import * as s from './DiaryCalendarStyled.jsx';

import diaryCheck from "../../assets/images/diaryCheck.svg";

export default function DiaryCalendar({ dateList }) {
  const [value, onChange] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      if (dateList?.includes(moment(date).format('YYYY-MM-DD'))) {
        return <s.FullCheckbox><s.DiaryCheck src = {diaryCheck} /></s.FullCheckbox>;
      } else {
        return <s.EmptyCheckbox />;
      }
    }
    return null;
  };

  return (
    <s.DiaryCalendar>
      <Calendar
        locale="kr"
        onChange={onChange}
        value={value}
        calendarType='hebrew'
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format("D")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        tileContent={tileContent}
      />
    </s.DiaryCalendar>
  );
}
