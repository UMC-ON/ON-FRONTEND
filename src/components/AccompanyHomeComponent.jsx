import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import PageHeader from '../components/PageHeader/PageHeader';
import DotInslideSlider from '../components/DotInsideSlider';
import DateRangePicker from '../components/CompanyCalendar/CompanyCalendar.jsx';

import bannerImg from '../assets/images/adBanner.svg';
import detailImg from '../assets/images/accompany_img.svg';
import arrowIcon from '../assets/images/bottomArrow.svg';
import searchIcon from '../assets/images/searchIcon.svg';
import AccompanyList from '../components/AccompanyList';
import marketImg from '../assets/images/borough_market.svg';
import pencilImg from '../assets/images/pencil.svg';
import closeIcon from '../assets/images/close_button.svg';
import whiteCloseIcon from '../assets/images/whiteCloseIcon.svg';
import resetIcon from '../assets/images/resetIcon.svg';

import { useLocation, useNavigate } from 'react-router-dom';
import BottomTabNav from '../components/BottomTabNav/BottomTabNav';

import Modal from '../components/Modal/Modal.jsx';
import SecondModal from './SecondModal.jsx';

const images = [bannerImg, bannerImg, bannerImg, bannerImg, bannerImg];

// const accompanyCards = [
//   {
//     isClosed: true,
//     image: marketImg,
//     title: '🔥🔥8/2 버로우 마켓 동행하실 분 구해요!🔥🔥',
//     date: '8/2',
//     people: '(1/4)',
//     place: '런던 버로우 마켓',
//     description: '같이 시장 구경하면서 사진 찍으며 좋은 추억 남기고 싶으신 분들을 찾습니다!! 많은 관심 부탁드립니다',
//     id: 'wjdscl',
//     age: '20대',
//     gender: '여',
//   },
// ];

const AccompanyHomeComponent = ({
  allData,
  startDate,
  endDate,
  isDateClicked,
  calendarClick,
  updateIsDateClicked,
  genderClick,
  gender,
  isGenderClicked,
  updateIsGenderClicked,
  countryClick,
  country,
  isCountryClicked,
  updateIsCountryClicked,
  updateEverything,
  isValidated,
}) => {
  const navigate = useNavigate();
  const goPost = () => {
    if (isValidated == null) {
      // alert('not validated');
      setModalOpen(true);
    } else {
      navigate('./post');
    }
  };

  const resetDate = () => {
    updateIsDateClicked();
  };

  const resetGender = () => {
    updateIsGenderClicked();
  };

  const resetCountry = () => {
    updateIsCountryClicked();
  };

  const resetEverything = () => {
    updateEverything();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
    });
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openNextModal = () => {
    setModalOpen(false);
    navigate('/mypage/schoolAuth');
  };

  return (
    <>
      <PageHeader
        pageName={'동행 구하기'}
        nav={'/'}
      />
      <Space />

      <DotInslideSlider images={images} />
      <SmallSpace />

      <RoundContainer
        $isDateClicked={isDateClicked}
        $isGenderClicked={isGenderClicked}
        $isCountryClicked={isCountryClicked}
      >
        <FlexContainer>
          <Span>
            {isDateClicked || isGenderClicked || isCountryClicked ? (
              <Icon
                src={resetIcon}
                size={'25px'}
                $right={'7px'}
                onClick={resetEverything}
              />
            ) : null}

            <GreyPicker $isDateClicked={isDateClicked}>
              <span onClick={calendarClick}>
                {startDate && endDate
                  ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                  : '날짜'}
                {!isDateClicked && <Icon src={arrowIcon} />}
              </span>
              {isDateClicked && (
                <Icon
                  src={whiteCloseIcon}
                  onClick={resetDate}
                />
              )}
            </GreyPicker>

            <GreyPicker $isCountryClicked={isCountryClicked}>
              <span onClick={countryClick}>
                {country ? `${country}` : '국가'}
                {!isCountryClicked && <Icon src={arrowIcon} />}
              </span>
              {isCountryClicked && (
                <Icon
                  src={whiteCloseIcon}
                  onClick={resetCountry}
                />
              )}
            </GreyPicker>

            <GreyPicker $isGenderClicked={isGenderClicked}>
              <span onClick={genderClick}>
                {gender ? `${gender}` : '성별'}
                {!isGenderClicked && <Icon src={arrowIcon} />}
              </span>
              {isGenderClicked && (
                <Icon
                  src={whiteCloseIcon}
                  onClick={resetGender}
                />
              )}
            </GreyPicker>
          </Span>
          {/* {!isDateClicked && !isGenderClicked && !isCountryClicked ? (
              <Icon src={searchIcon} size={'25px'} />
              ) : null } */}
        </FlexContainer>
      </RoundContainer>

      <SmallSpace />
      <AccompanyList datas={allData} />
      <BigSpace />

      <PageContainer>
        <WriteButton onClick={goPost}>
          <img
            src={pencilImg}
            alt="Write"
          />
          <LeftPadding />글 쓰기
        </WriteButton>
      </PageContainer>

      {isModalOpen && (
        <SecondModal
          closeModal={closeModal}
          openNextModal={openNextModal}
        />
      )}

      <BottomTabNav />
    </>
  );
};

export default AccompanyHomeComponent;

const Span = styled.span`
  display: flex;
  align-items: center;
`;

const LeftPadding = styled.div`
  padding-left: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const Icon = styled.img`
    width: ${props => props.size || '10px'};
    height: ${props => props.size || '10px'};
    padding-left: 3px;
    padding-right: ${props => props.$right || '0'};
    cursor:pointer;
`;

const RoundContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  box-shadow: ${(props) =>
    props.$isDateClicked || props.$isGenderClicked || props.$isCountryClicked
      ? 'none'
      : '0 4px 8px rgba(0, 0, 0, 0.1)'};
  padding: 8px;
  border-radius: 18px;
`;

const GreyPicker = styled.div`
  background-color: #e8e8e8;
  font-family: 'Inter';
  font-size: 0.8em;
  padding: 5px;
  border-radius: 18px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 8px;
  color: ${props => props.$isDateClicked || props.$isGenderClicked || props.$isCountryClicked ? '#FFFFFF' : '#363636'};
  background: ${props => props.$isDateClicked || props.$isGenderClicked || props.$isCountryClicked ?  'linear-gradient(135deg, #C2C7FF, #AD99FF);' : ''};
  cursor:pointer;
`;

const SmallSpace = styled.div`
  margin-top: 1.5rem;
`;

const Space = styled.div`
  margin-top: 3.8rem;
`;

const BigSpace = styled.div`
  margin-top: 7.5rem;
`;

const WriteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 110px;

  border-radius: 55px;
  border: 1px solid #cccccc;
  width: 148px;
  height: 50px;
  padding: 15px 26px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #d6ebff, #c2c7ff);
  color: white;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 2;
  &:hover {
    outline: none; /* hover 상태에서도 outline 제거 */
    border-color: #b0c4de; /* 선택적으로 hover 시 border 색 변경 */
  }

  &:focus {
    outline: none; /* focus 상태에서 outline 제거 */
  }

  -webkit-tap-highlight-color: transparent;
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  align-content: start;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
