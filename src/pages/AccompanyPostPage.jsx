import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';

import postIcon from '../assets/images/writepost_icon.svg';
import greyPlusButton from '../assets/images/greyPlusButton.svg';
import greyMinusButton from '../assets/images/greyMinusButton.svg';
import minusButton from '../assets/images/minusButton.svg';
import plusButton from '../assets/images/plusButton.svg';
import closeIcon from '../assets/images/close_button.svg';
import cameraIcon from '../assets/images/camera_icon.svg';
import purplePlusButton from '../assets/images/purplePlusButton.svg';
import whiteCloseIcon from '../assets/images/whiteCloseIcon.svg';

import CustomCheckbox from '../components/CustomCheckBox';
import CameraBottom from '../components/CameraBottom';
import DateRangePicker from '../components/CompanyCalendar/CompanyCalendar.jsx';
import SelectCountry from './SelectCountry/SelectCountry.jsx';
import SelectCity from './SelectCity/SelectCity.jsx';
import Loading from '../components/Loading/Loading.jsx';
import AlertModal from '../components/AlertModal.jsx';

import { multiFilePostData, getData } from '../api/Functions';
import { WRITE_ACCOMPANY, GET_USER_INFO } from '../api/urls';
import ErrorScreen from '../components/ErrorScreen.jsx';

function AccompanyPostPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [ageChecked, setAgeChecked] = useState(false);
  const [schoolChecked, setSchoolChecked] = useState(false);

  const [age, setAge] = useState(null);
  const [school, setSchool] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysDifference, setDaysDifference] = useState(0);
  const [limitDays, setLimitDays] = useState(0);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [personValue, setPersonValue] = useState(0);

  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState('');
  const [isCountryClicked, setIsCountryClicked] = useState(false);

  const [showCity, setShowCity] = useState(false);
  const [city, setCity] = useState(null);

  const [showCity2, setShowCity2] = useState(false);
  const [city2, setCity2] = useState(null);

  const [isCityClicked, setIsCityClicked] = useState(false);
  const [isCityClicked2, setIsCityClicked2] = useState(false);

  const minusSrc = daysDifference == 0 ? greyMinusButton : minusButton;
  const plusSrc = daysDifference == limitDays ? greyPlusButton : plusButton;

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const [userData, setUserData] = useState(null);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const formatDate = (dateString) => {
    return dateString.replace(/-/g, '/');
  };

  useEffect(() => {
    // console.log(endDate);
  }, [endDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const user_data = await getData(GET_USER_INFO, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });

        const data = user_data.data;
        setUserData(data);
        // console.log('user data');
        // console.log(user_data.data);

        setAge(data.age);
        setCountry(data.country);
        // console.log(data.country);
        setSchool(data.dispatchedUniversity);
      } catch (error) {
        return <ErrorScreen/>
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [input, setInput] = useState({
    userId: null,
    ageAnonymous: ageChecked,
    currentCountry: '',
    universityAnonymous: schoolChecked,
    title: '',
    content: '',
    travelArea: [city, city2],
    totalRecruitNumber: personValue,
    schedulePeriodDay: daysDifference,
    startDate: startDate,
    endDate: endDate,
    imageFiles: [null],
  });

  useEffect(() => {
    if (userData) {
      setInput((prevInput) => ({
        ...prevInput,
        userId: userData.id,
        ageAnonymous: ageChecked,
        currentCountry: userData.country,
        universityAnonymous: schoolChecked,
        travelArea: [city, city2],
        totalRecruitNumber: personValue,
        schedulePeriodDay: daysDifference,
        startDate: startDate,
        endDate: endDate,
        imageFiles: [selectedFile],
      }));
    }
  }, [
    userData,
    ageChecked,
    country,
    schoolChecked,
    city,
    city2,
    personValue,
    daysDifference,
    startDate,
    endDate,
    selectedFile,
  ]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handlePerson = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue.trim() !== '') {
      setPersonValue(parseInt(newValue, 10));
    } else {
      setPersonValue(0);
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue.trim() !== '') {
      if (newValue <= limitDays) {
        setDaysDifference(parseInt(newValue, 10));
      } else {
        setDaysDifference(limitDays);
      }
    } else {
      setDaysDifference(0);
    }
  };

  const increaseDays = () => {
    if (daysDifference < limitDays) {
      setDaysDifference(daysDifference + 1);
      // console.log('Limit', limitDays);
      // console.log('Days', daysDifference);
    }
  };

  const decreaseDays = () => {
    if (daysDifference > 0) {
      setDaysDifference(daysDifference - 1);
      // console.log('Limit', limitDays);
      // console.log('Days', daysDifference);
    }
  };

  const handleApplyClick = (start, end) => {
    setStartDate(moment(start).format('YYYY-MM-DD'));
    setEndDate(moment(end).format('YYYY-MM-DD'));

    const startMoment = moment(start);
    const endMoment = moment(end);
    const difference = endMoment.diff(startMoment, 'days');
    setDaysDifference(difference + 1);
    setLimitDays(difference + 1);
    setIsDateClicked(true);
    setShowCalendar(false);
  };

  const handleGetCountry = (country) => {
    setCountry(country);
    setIsCountryClicked(true);
    setShowCountry(false);
  };

  const handleGetCity = (city) => {
    setCity(city);
    setIsCityClicked(true);
    setShowCity(false);
  };

  const handleGetCity2 = (city) => {
    setCity2(city);
    setIsCityClicked2(true);
    setShowCity2(false);
  };

  const checkAge = (e) => {
    setAgeChecked(e.target.checked);
  };

  const checkSchool = (e) => {
    setSchoolChecked(e.target.checked);
  };

  const navigate = useNavigate();

  const onClickBackButton = () => {
    navigate(-1);
  };

  // function goToAccompany() {
  //   navigate("/accompany");
  // }

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCountryClick = () => {
    setShowCountry(!showCountry);
  };

  const handleCityClick = () => {
    setShowCity(!showCity);
  };

  const handleCityClick2 = () => {
    setShowCity2(!showCity2);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDeleteCity = () => {
    if (city2 != null) {
      setCity(city2);
      setCity2(null);
      setIsCityClicked2(false);
    } else {
      setIsCityClicked(false);
      setCity(null);
    }
  };

  const handleDeleteCity2 = () => {
    setIsCityClicked2(false);
    setCity2(null);
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsAlertModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAlertModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSize((file.size / 1024).toFixed(2));
    // send to server
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const formData = new FormData();
  // const json = JSON.stringify(input);
  // const blob = new Blob([json], {type: 'application/json'});
  // formData.append('dispatchCertifyApplyRequestDto', blob);

  useEffect(() => {
    if (userData) {
      setInput((prevInput) => ({
        ...prevInput,
        userId: userData.id,
        ageAnonymous: ageChecked,
        currentCountry: country,
        universityAnonymous: schoolChecked,
        travelArea: [city, city2],
        totalRecruitNumber: personValue,
        schedulePeriodDay: daysDifference,
        startDate: startDate,
        endDate: endDate,
        imageFiles: [selectedFile],
      }));
    }
  }, [
    userData,
    ageChecked,
    country,
    schoolChecked,
    city,
    city2,
    personValue,
    daysDifference,
    startDate,
    endDate,
    selectedFile,
    previewUrl,
  ]);

  const postData = async () => {
    const formData = new FormData();

    const jsonData = {
      userId: input.userId,
      ageAnonymous: ageChecked,
      currentCountry: country,
      universityAnonymous: schoolChecked,
      title: input.title,
      content: input.content,
      travelArea: [city, city2],
      totalRecruitNumber: personValue,
      schedulePeriodDay: daysDifference,
      startDate: startDate,
      endDate: endDate,
    };

    // console.log(jsonData);

    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('requestDTO', jsonBlob);

    if (selectedFile) {
      formData.append('imageFiles', selectedFile);
    }

    try {
      const response = await multiFilePostData(WRITE_ACCOMPANY, formData, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      });

      if (response) {
        // console.log(response.data.result);
      }
    } catch (error) {
      return <ErrorScreen/>
      // console.error('Error posting data:', error);
    }
  };

  const onSubmit = () => {
    // console.log(input);
    if (personValue == 0) {
      handleModalOpen('모집 인원을');
    } else if (city == null) {
      handleModalOpen('여행 지역을');
    } else if (startDate == null) {
      handleModalOpen('예상 일정을');
    } else if (input.title == '') {
      handleModalOpen('제목을');
    } else if (input.content == '') {
      handleModalOpen('요청사항을');
    } else {
      postData().then(() => {
        navigate('/accompany', { state: { refresh: true } });
      });
    }
    // alert(input);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <RightContainer>
        <GreyButton onClick={onClickBackButton}>취소</GreyButton>
        <BlueButton onClick={onSubmit}>등록</BlueButton>
      </RightContainer>

      <SpaceBetween />

      <LeftContainer>
        <Title>여행 동행 구하기</Title>
        <Left>
          <GreyText>정보를 수정하려면</GreyText>
        </Left>
        <Left>
          <GreyText>편집 버튼(</GreyText>
          <SmallIcon
            src={postIcon}
            $top="10px"
          />
          <GreyText>)을 눌러 입력해 주세요.</GreyText>
        </Left>
      </LeftContainer>

      <BigContainer>
        <BlueContainer>
          <Left $bottom="5px">
            <BlackText>나이 :</BlackText>
            <BlackText $isChecked={ageChecked}>{age}세</BlackText>
            <CustomCheckbox
              checked={ageChecked}
              onChange={checkAge}
            />
            <GreyText
              $size="0.7rem"
              $left="5px"
              $top="10px"
            >
              나이 비공개
            </GreyText>
          </Left>
          <Left $bottom="5px">
            <BlackText>현재 국가 : </BlackText>
            {!isCountryClicked && (
              <CircleContainer onClick={handleCountryClick}>
                {country}
                <SmallIcon
                  src={postIcon}
                  $left="5px"
                />
              </CircleContainer>
            )}
            {isCountryClicked && (
              <CircleContainer onClick={handleCountryClick}>
                {`${country}`}
                <SmallIcon
                  src={postIcon}
                  $left="5px"
                />
              </CircleContainer>
            )}
          </Left>
          <Left $bottom="5px">
            <BlackText>파견교 : </BlackText>
            <BlackText
              $isChecked={schoolChecked}
              $size="0.8rem"
            >
              {school}
            </BlackText>
            <CustomCheckbox
              checked={schoolChecked}
              onChange={checkSchool}
            />
            <GreyText
              $size="0.7rem"
              $left="5px"
              $top="10px"
            >
              파견교 비공개
            </GreyText>
          </Left>
          <Left $bottom="5px">
            <BlackText>모집 인원 : </BlackText>
            <Input
              $width="12px"
              onChange={handlePerson}
              value={personValue}
            />
            <GreyText $left="3px">명</GreyText>
          </Left>
          <Left $bottom="5px">
            <BlackText>여행 지역 : </BlackText>
            {!isCityClicked && (
              <PlusButton
                src={plusButton}
                onClick={handleCityClick}
              />
            )}
            {isCityClicked && (
              <>
                <CircleContainer>
                  <CircleText onClick={handleCityClick}>{`${city}`}</CircleText>
                  <SmallIcon
                    src={whiteCloseIcon}
                    $left="5px"
                    onClick={handleDeleteCity}
                  />
                </CircleContainer>
              </>
            )}
          </Left>
          <Left $bottom="5px">
            <MarginLeft2 />
            {!isCityClicked2 && isCityClicked && (
              <PlusButton
                src={plusButton}
                onClick={handleCityClick2}
              />
            )}
            {isCityClicked2 && (
              <CircleContainer>
                <CircleText onClick={handleCityClick2}>{`${city2}`}</CircleText>
                <SmallIcon
                  src={whiteCloseIcon}
                  $left="5px"
                  onClick={handleDeleteCity2}
                />
              </CircleContainer>
            )}
          </Left>
          <Left $bottom="5px">
            <BlackText>예상 일정 : </BlackText>
            {!isDateClicked && (
              <PlusButton
                onClick={handleCalendarClick}
                src={plusButton}
              />
            )}
            {isDateClicked && (
              <>
                <CircleContainer
                  onClick={handleCalendarClick}
                >{`${formatDate(startDate)}`}</CircleContainer>
                <GreyText $left="6px">~</GreyText>
                <CircleContainer
                  onClick={handleCalendarClick}
                >{`${formatDate(endDate)}`}</CircleContainer>
                <GreyText $left="6px">사이</GreyText>
              </>
            )}
          </Left>
          {isDateClicked && (
            <Left>
              <MarginLeft />
              <CircleButton
                src={minusSrc}
                disabled={daysDifference === 0}
                onClick={decreaseDays}
              />
              <Input
                $width="20px"
                $left="8px"
                value={daysDifference.toString()}
                onChange={handleChange}
              />
              <CircleButton
                src={plusSrc}
                disabled={daysDifference === limitDays}
                onClick={increaseDays}
              />
              <GreyText $left="6px">일</GreyText>
            </Left>
          )}
        </BlueContainer>
      </BigContainer>

      {showCalendar && (
        <>
          <Overlay onClick={handleCalendarClick} />
          <BottomTabLayout>
            <TopBar>
              <TopHeader>날짜</TopHeader>
              <Close
                src={closeIcon}
                onClick={handleCalendarClick}
              />
            </TopBar>
            <LabelText>여행 가고 싶은 기간을 설정해 주세요!</LabelText>
            <LabelText2>
              일정이 확정되지 않았다면 범위를 넓게 설정할 수 있어요.
            </LabelText2>
            <DateRangePicker onApply={handleApplyClick} />
          </BottomTabLayout>
        </>
      )}

      {showCountry && (
        <>
          <SelectCountry
            closeModal={handleCountryClick}
            getCountry={handleGetCountry}
          />
        </>
      )}

      {showCity && (
        <>
          <SelectCity
            closeModal={handleCityClick}
            getCity={handleGetCity}
          />
        </>
      )}

      {showCity2 && (
        <>
          <SelectCity
            closeModal={handleCityClick2}
            getCity={handleGetCity2}
          />
        </>
      )}

      <BigContainer>
        <Left>
          <Title $size="1.4rem">제목</Title>
        </Left>
      </BigContainer>
      <GreyInput
        placeholder="제목을 입력해 주세요."
        $height="2.7rem"
        onChange={onChangeInput}
        name="title"
      />

      <BigContainer>
        <Left>
          <Title $size="1.4rem">요청사항</Title>
        </Left>
      </BigContainer>

      <GreyInput
        placeholder="요청사항과 동행인에게 하고 싶은 말을 적어주세요. "
        $height="15rem"
        onChange={onChangeInput}
        name="content"
      />

      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
      {previewUrl && (
        <>
          <Container>
            <ImagePreview src={previewUrl} />
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                right: '9%',
                top: '5%',
                zIndex: '2',
              }}
              onClick={handleDeleteImage}
            >
              <path
                d="M14.4433 0.0955087C14.5707 -0.0318362 14.7771 -0.0318362 14.9045 0.0955087C15.0318 0.222854 15.0318 0.42932 14.9045 0.556665L7.96116 7.5L14.9045 14.4433C15.0318 14.5707 15.0318 14.7771 14.9045 14.9045C14.7771 15.0318 14.5707 15.0318 14.4433 14.9045L7.5 7.96116L0.556665 14.9045C0.42932 15.0318 0.222853 15.0318 0.0955081 14.9045C-0.031836 14.7771 -0.031836 14.5707 0.0955081 14.4433L7.03884 7.5L0.095509 0.556665C-0.0318359 0.42932 -0.0318359 0.222854 0.095509 0.0955087C0.222854 -0.0318362 0.429321 -0.0318362 0.556666 0.0955087L7.5 7.03884L14.4433 0.0955087Z"
                fill="#000000"
              />
            </svg>
          </Container>

          <Right>
            <SmallGreyText>({fileSize} KB)</SmallGreyText>
          </Right>
        </>
      )}

      <Space />

      <BottomTabLayout2>
        <LeftButton
          src={cameraIcon}
          onClick={handleButtonClick}
        />
      </BottomTabLayout2>

      {isAlertModalOpen && (
        <AlertModal
          closeModal={handleModalClose}
          line1={modalContent}
          line2={'동행인 신청을 위해서는'}
          line3={'동행인에 대한 정보가 필요합니다.'}
        />
      )}
    </>
  );
}

export default AccompanyPostPage;

const Container = styled.div`
  position: relative;
  width: '100%';
`;

const BottomTabLayout = styled.div`
  width: 100%;
  height: auto; /* 높이를 내용에 맞게 조정 */
  min-height: 300px;
  max-height: calc(50rem - 50px);
  position: fixed;
  bottom: 0;
  border-radius: 14px 14px 0px 0px;
  border: 1px solid white;
  background: #ffffff;
  z-index: 10;
  display: flex;
  flex-direction: column; /* 위에서 아래로 배치 */
  align-items: flex-start; /* 왼쪽 정렬 */
  box-sizing: border-box;
  box-shadow: 0px -1px 4px 0px #e2e2e2;
  padding: 20px; /* 내부 여백 추가 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능 */
`;

const LabelText = styled.div`
  font-family: Inter;
  font-weight: bold;
  color: #3e73b2;
  margin-bottom: 10px; /* 아래 요소와 간격 추가 */
  font-size: 0.85em;
`;

const LabelText2 = styled.div`
  font-family: Inter;
  color: #7a7a7a;
  margin-bottom: 5px; /* 아래 요소와 간격 추가 */
  font-size: 0.85em;
`;

const TopHeader = styled.div`
  font-size: 12px;
  color: #cccccc;
  margin-bottom: 10px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between; /* X 버튼과 텍스트를 양쪽 정렬 */
  align-items: center; /* 세로 정렬 */
  width: 100%;
`;

const Space = styled.section`
  margin-bottom: 7.5rem;
`;

const CircleContainer = styled.section`
  background: #868ee8;
  border-radius: 20px;
  font-size: 0.8rem;
  color: white;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  padding-left: 6px;
  cursor:pointer;
`;

const CircleText = styled.section`
  font-size: 0.8rem;
  color: white;
`;

const CircleContainer2 = styled.section`
  background: linear-gradient(to right bottom, #c2c7ff, #ad99ff);
  border-radius: 20px;
  font-size: 0.8rem;
  color: white;
  padding: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  padding-left: 6px;
`;

const Input = styled.input`
  margin-left: ${(props) => props.$left || '10px'};
  border-radius: 5px;
  border: 1px solid #cabccb;
  width: ${(props) => props.$width || '25px'};
  margin-top: 4px;
  height: 18px;
  color: #838383;
  font-size: 0.8rem;
  padding-left: 5px;
  font-family: Inter;
  background-color: white;
`;

const GreyInput = styled.textarea`
  border-radius: 10px;
  border: 1px solid #cabccb;
  color: black;
  font-size: 1rem;
  padding: 10px;
  font-family: Inter;
  width: 90%;
  margin-top: 1vh;
  margin-bottom: 3vh;
  height: ${(props) => props.$height || 'auto'};
  background-color: white;
  box-sizing: border-box; /* padding과 border를 크기에 포함 */
   resize: none;

  &:hover {
    border-color: #b5b5b5; /* hover 상태에서 border 색상만 변경 */
  }

  &:focus {
    border: 1px solid #cabccb;
    outline: none;
  }

  &:active {
    border: 1px solid #cabccb;
    outline: none;
  }
`;

const BigContainer = styled.section`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const SmallIcon = styled.img`
  padding-top: ${(props) => props.$top || '0'};
  padding-left: ${(props) => props.$left || '0'};
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${(props) => props.$bottom || '0'};
`;

const LeftContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1.5rem;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: white;
  position: fixed;
  width: 100%;
  padding: 2vh 0;
  z-index: 2;
`;

const SpaceBetween = styled.div`
  margin-top: 5vh;
`;

const GreyButton = styled.button`
  border-radius: 20px;
  background-color: #e4e4e4;
  color: white;
  text-align: center;
  font-family: Inter;
  font-size: 1em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 8px;
  padding: 5px 15px;
  border: none;
  box-sizing: border-box;

  &:hover {
    border: none;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:active {
    border: none;
    outline: none;
  }
`;

const BlueButton = styled.button`
  border-radius: 20px;
  background: linear-gradient(135deg, #c2c7ff, #ad99ff);
  color: white;
  font-family: Inter;
  font-size: 1em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 20px;
  padding: 5px 15px;
  border: none;
  box-sizing: border-box;

  &:hover {
    border: none;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:active {
    border: none;
    outline: none;
  }
`;

const BlueContainer = styled.div`
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(214, 235, 255, 0.2),
    rgba(194, 199, 255, 0.2)
  );
  width: 100%;
  padding-top: 3vh;
  padding-bottom: 4vh;
  margin-bottom: 4vh;
`;

const Title = styled.div`
  color: black;
  font-family: Inter;
  font-size: ${(props) => props.$size || '1.563rem'};
  font-weight: bold;
`;

const GreyText = styled.div`
  color: ${(props) => props.$color || '#838383'};
  font-family: Inter;
  font-size: ${(props) => props.$size || '0.875rem'};
  margin-top: ${(props) => props.$top || '1vh'};
  margin-left: ${(props) => props.$left || '0'};
`;

const BlackText = styled.div`
  color: black;
  font-family: Inter;
  font-size: ${(props) => props.$size || '1rem'};
  padding-left: 1rem;
  margin-top: 0.5rem;
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? 'line-through' : 'none'};
`;

const PlusButton = styled.img`
  margin-top: 7px;
  margin-left: 7px;
  cursor:pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

const Close = styled.img`

  cursor: pointer;
`;



const CircleButton = styled.img`
  margin-left: 8px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const MarginLeft = styled.div`
  margin-left: 90px;
  margin-top: 30px;
`;

const MarginLeft2 = styled.div`
  margin-left: 85px;
  margin-top: 30px;
`;

export const LeftButton = styled.img`
  position: absolute;
  left: 25px;
  cursor:pointer;
`;

const BottomTabLayout2 = styled.div`
  width: 100%;
  height: 87px;
  position: fixed;
  bottom: 0;
  border-radius: 14px 14px 0px 0px;
  border: 1px solid white;
  background: #ffffff;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 32px 30px 32px;
  box-shadow: 0px -1px 4px 4px #e2e2e2;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  // max-width: 90%;
  width: 89%;
  height: auto;
  border-radius: 10px;
  display: 'block';
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.$bottom || '0'};
`;

const SmallGreyText = styled.div`
  color: ${(props) => props.$color || '#838383'};
  font-family: Inter;
  font-size: ${(props) => props.$size || '0.875rem'};
  margin-top: ${(props) => props.$top || '1vh'};
  margin-left: ${(props) => props.$left || '0'};
  margin-right: 1.5rem;
`;
