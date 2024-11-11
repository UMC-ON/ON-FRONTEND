import styled from 'styled-components';

export const DiaryCalendar = styled.div`
    &::before {
        content: '';
        position: absolute;
        top: 0; 
        left: 7px;
        right: 7px;
        bottom: 0;
        border-radius: 10px;
        padding: 3px; /* border 두께 조절 */
        background: linear-gradient(135deg, #D6EBFF, #C2C7FF);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out; 
        mask-composite: exclude;
    }
        
    .react-calendar {
        width: 350px;
        max-width: 100%;
        background: #F3F9FF;
        border: none;
        border-radius: 10px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding: 10px;
    }

    .react-calendar__navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
        padding: 0 10px;
    }

    .react-calendar__navigation__arrow {
        font-size: 22px; /* Keep a smaller font-size */
        transform: scale(1.5); /* Scale the arrows */
        line-height: 0.5; /* Adjust line-height to maintain the header height */
        background: none;
        color: #363636;
    }

    .react-calendar__navigation__label {
        font-weight: 600;
        font-family: Inter;
        font-size: 22px; /* Keep a smaller font-size */
        transform: scale(1.0); /* Scale the arrows */
        line-height: 0.5; /* Adjust line-height to maintain the header height */
        background: none;
        color: #363636;
        height: 2em;
    }

    .react-calendar__tile {
        background: none;
        text-align: center;
        font: inherit;
        font-size: 0.833em;
        height: 60px;
    }

    .react-calendar__tile--now {
        background: #cacefc;
    }
  
    .react-calendar__tile--now abbr {
        color: white;
    }

    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
    }

    .react-calendar__month-view__days__day--neighboringMonth,
    .react-calendar__decade-view__years__year--neighboringDecade,
    .react-calendar__century-view__decades__decade--neighboringCentury {
        color: #757575;
    }
`;

export const EmptyCheckbox = styled.div`
    width: 14px;
    height: 14px;
    background: #D9D9D9;
    border-radius: 2px;
    margin: 5px auto;
`;

export const FullCheckbox = styled.div`
    width: 14px;
    height: 14px;
    background: ${(props) => props.theme.purpleGra};
    border-radius: 2px;
    margin: 5px auto;
`

export const DiaryCheck = styled.img`
    width: 10px;
    height: 10px;
`