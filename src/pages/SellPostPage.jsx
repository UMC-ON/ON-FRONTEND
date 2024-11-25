import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import camera from '../assets/images/camera.svg';
import whiteCloseIcon from '../assets/images/whiteCloseIcon.svg';

import SellPostHeader from '../components/SellPostHeader';
import SellPostSelectCity from '../components/SellPostSelectCity/SellPostSelectCity';
import SellPostCitySelect from '../components/SellPostShowCitySelect';
import AlertModal from '../components/SellAlertModal.jsx';

import { postData, multiFilePostData } from '../api/Functions';
import { POST_ITEM } from '../api/urls';

function SellPost() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [image, setImage] = useState(null); // 한 장의 이미지로 수정
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [content, setContent] = useState('');
  const [share, setShare] = useState(false);
  const fileInputRef = useRef(null);
  const [showCity, setShowCity] = useState(false);
  const [city, setCity] = useState({ country: '', city: '' });
  const [isCityClicked, setIsCityClicked] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const userInfo = useSelector((state) => state.user.user);

  const handleModalOpen = (content) => {
    setModalContent(content);
    setIsAlertModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAlertModalOpen(false);
  };

  const resetCityClick = () => {
    setIsCityClicked(false);
    setCity({ country: '', city: '' });
  };

  const handleGetCity = (locationInfo) => {
    setCity(locationInfo);
    setIsCityClicked(true);
    setShowCity(false);
  };

  const handleCityClick = () => {
    setShowCity(!showCity);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = () => {
    setImage(null); // 이미지 삭제
  };

  const navigate = useNavigate();

  const postData = async () => {
    const formData = new FormData();

    const jsonData = {
      userId: userInfo.id,
      title: title,
      cost: cost,
      dealType: selectedOption === 'directly' ? 'DIRECT' : 'DELIVERY',
      content: content,
      currentCountry: city.country,
      currentLocation: city.city,
      share: share,
    };
    console.log(jsonData);

    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('requestDTO', jsonBlob);

    if (image) {
      formData.append('imageFiles', image);
    }

    try {
      const response = await multiFilePostData(POST_ITEM, formData, {
        Authorization: `Bearer ${localStorage.getItem('AToken')}`,
      });

      if (response) {
        console.log(response.data.result);
        navigate('/sell');
      }
    } catch (error) {
      console.error('ITEM POST Error:', error.message);
    }
  };

  const onSubmit = () => {
    if (city.city == '') {
      handleModalOpen('현재 위치를');
    } else if (title == '') {
      handleModalOpen('제목을');
    } else if (cost == '') {
      handleModalOpen('가격을');
    } else if (selectedOption == null) {
      handleModalOpen('거래 형식을');
    } else if (content == '') {
      handleModalOpen('상품 설명을');
    } else {
      postData();
    }
  };

  return (
    <>
      <SellPostHeader onSubmit={onSubmit} />
      <Space />
      <Photo
        isImageUploaded={image}
        onClick={handleCameraClick}
      >
        {image ? (
          <ImageWrapper>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
            />
            <DeleteButton onClick={handleDeleteImage}>
              <img
                src={whiteCloseIcon}
                alt="Delete"
              />
            </DeleteButton>
          </ImageWrapper>
        ) : (
          <Camera src={camera} />
        )}
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </Photo>

      <Information>
        <TitleText>물품 등록하기</TitleText>
        <br />
        <Location>
          현재 위치:
          <Region>
            <SellPostCitySelect
              cityClick={handleCityClick}
              city={city}
              isCityClicked={isCityClicked}
              updateIsCityClicked={resetCityClick}
            />
            {showCity && (
              <SellPostSelectCity
                closeModal={handleCityClick}
                getCity={handleGetCity}
              />
            )}
          </Region>
        </Location>
        <br />
        <Section>
          <Label>제목</Label>
          <Add
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>
        <br />
        <Section>
          <Label>판매 금액</Label>
          <Add
            placeholder="₩ 판매 금액을 입력해 주세요."
            type="text"
            value={cost ? `₩ ${cost}` : ''}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
              setCost(inputValue);
            }}
          />
        </Section>

        <CheckboxContainer>
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
          />
          <span style={{ fontSize: '13px', marginLeft: '3px' }}>나눔</span>
        </CheckboxContainer>
        <Section>
          <Label>거래 형식</Label>
          <Options>
            <Directly
              selected={selectedOption === 'directly'}
              onClick={() => setSelectedOption('directly')}
            >
              직접 만나서 거래
            </Directly>
            <Delivery
              selected={selectedOption === 'delivery'}
              onClick={() => setSelectedOption('delivery')}
            >
              택배 거래
            </Delivery>
          </Options>
        </Section>
        <br />
        <Section>
          <Label>상품 설명</Label>
          <Description
            placeholder="상품에 대한 설명을 입력해 주세요. 거래 가능 기간도 함께 작성해 주시면 거래가 빠르게 진행될 수 있어요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Section>
      </Information>
      {isAlertModalOpen && (
        <AlertModal
          closeModal={handleModalClose}
          line1={modalContent}
        />
      )}
    </>
  );
}

export default SellPost;

const Space = styled.div`
  margin-top: 6.5vh;
`;

const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12em;
  margin-bottom: 2vh;
  cursor: pointer;
  background: ${(props) =>
    props.isImageUploaded
      ? 'white'
      : 'linear-gradient(135deg, #C2C7FF80 0%, #AD99FF80 50%)'};
`;

const Camera = styled.img`
  width: 15%;
  height: 15%;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Information = styled.div`
  color: black;
  width: 100%;
  padding: 20px 26px;
  box-sizing: border-box;
  margin-bottom: 2vh;
  text-align: left;
`;

const TitleText = styled.p`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 1vh;
`;

const Location = styled.div`
  margin-bottom: 2vh;
`;

const Region = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 0.8em;
  padding: 0.5em;
  border-radius: 20px;
  color: white;
`;

const Section = styled.div`
  margin-bottom: 1vh;
`;

const Label = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const Add = styled.input`
  border-radius: 15px;
  height: 1.5em;
  border: 1px solid #cabccb;
  font-size: 15px;
  color: #838383;
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 1vh;
  width: 95%;
  &::placeholder {
    color: #838383;
    font-size: 15px;
    font-family: 'Inter';
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
  input[type='checkbox'] {
    appearance: none; /* 기본 체크박스 스타일 제거 */
    width: 1.2em;
    height: 1.2em;
    background-color: white; /* 기본 배경 흰색 */
    border: 2px solid #868ee8; /* 테두리 추가 */
    border-radius: 4px; /* 둥근 모서리 */
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    &:checked {
      background-color: #868ee8; /* 체크된 상태 배경 */
      border-color: #868ee8; /* 체크된 상태 테두리 색상 */
    }

    &:checked::after {
      content: '✔'; /* 체크 표시 추가 */
      color: white; /* 체크 표시 색상 */
      font-size: 0.8em; /* 체크 표시 크기 */
      font-weight: bold; /* 체크 표시 강조 */
      background-color: rgba(134, 142, 232, 0.2);
    }
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
  margin-top: 1vh;
`;

const Directly = styled.div`
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    props.selected
      ? props.theme.purpleGra
      : 'linear-gradient(to bottom, #DFDFDF 0%, #D1D1D1 50%, #C3C3C3 100%)'};
  width: 10em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  cursor: pointer;
`;

const Delivery = styled.div`
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    props.selected
      ? props.theme.purpleGra
      : 'linear-gradient(to bottom, #DFDFDF 0%, #D1D1D1 50%, #C3C3C3 100%)'};
  width: 10em;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Description = styled.textarea`
  background-color: white;
  border-radius: 20px;
  height: 20em;
  border: 1px solid #cabccb;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 2vh;
  width: 99%;
  resize: none;
  font-size: 14px;
  color: #838383;
  line-height: 1.5;
  margin-top: 1vh;

  &::placeholder {
    color: #838383;
    font-size: 15px;
    font-family: 'Inter';
  }
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
  }
`;
