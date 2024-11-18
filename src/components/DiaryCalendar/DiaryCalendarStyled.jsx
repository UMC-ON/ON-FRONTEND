import styled from 'styled-components';

export const DiaryCalendar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    
    .react-calendar {
        width: 100%;
        max-width: 350px;
        background: #F3F9FF;
        border-radius: 10px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding: 10px;
        position: relative;
        z-index: 1;
    }

    .react-calendar::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px; /* 모서리 반경을 .react-calendar와 일치시킴 */
        padding: 2px; /* 그라데이션 보더 두께 */
        background: linear-gradient(135deg, #D6EBFF, #C2C7FF); /* 그라데이션 보더 */
        -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        mask-composite: exclude;
        -webkit-mask-composite: xor;
        z-index: -1;
    }

    @media (max-width: 768px) {
    .react-calendar {
    max-width: 90%;}}

    .react-calendar__navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
        border-bottom: 2px dashed white;
        padding: 0 10px;
    }

    .react-calendar__navigation__arrow {
        font-size: 22px;
        transform: scale(1.8);
        line-height: 0.5;
        background: none;
    }

    .react-calendar__navigation__label {
        font-weight: 600;
        font-family: Inter;
        font-size: 22px;
        transform: scale(1.2);
        line-height: 0.5;
        background: none;
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
`;




export const EmptyCheckbox = styled.div`
    width: 14px;
    height: 14px;
    background: #D9D9D9;
    border-radius: 2px;
    margin: 5px auto;
    opacity: 80%;
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