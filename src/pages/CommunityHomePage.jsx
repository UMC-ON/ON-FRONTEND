import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import informationIcon from '../assets/images/information_icon.svg';
import writeIcon from '../assets/images/write_icon.svg';
import companyIcon from '../assets/images/company_icon.svg';
import rightIcon from '../assets/images/right_arrow.svg';
import infoCircleIcon from '../assets/images/infoCircleIcon.svg';
import freeCircleIcon from '../assets/images/freeCircleIcon.svg';
import accompanyCircleIcon from '../assets/images/accompanyCircleIcon.svg';
import cloudImg from '../assets/images/cloudImage.svg';

import BottomTabNav from '../components/BottomTabNav/BottomTabNav';
import NavBar from '../components/NavBar/NavBar';
import CommunityHomeList from '../components/CommunityHomeList';
import Loading from '../components/Loading/Loading';

import { getData } from '../api/Functions';
import { GET_RECENT_POST_OF, GET_RECENT_ACCOMPANY } from '../api/urls';

function CommunityHomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/accompany');
  }

  function goToGeneralPost() {
    navigate('/community/general/post');
  }

  function goToInfoPost() {
    navigate('/community/info/post');
  }

  const [isLoading, setIsLoading] = useState(true);
  const [infoData, setInfoData] = useState([]);
  const [freeData, setFreeData] = useState([]);
  const [accompanyData, setAccompanyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const info_data = await getData(GET_RECENT_POST_OF('INFO'), {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        setInfoData(info_data.data);
        // //console.log(data.data);

        const free_data = await getData(GET_RECENT_POST_OF('FREE'), {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });

        setFreeData(free_data.data);
        //console.log(free_data.data);

        const accom_data = await getData(GET_RECENT_ACCOMPANY, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        setAccompanyData(accom_data.data);
        // //console.log(accom_data.data);
      } catch (error) {
        //console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Space />

      <RoundContainer>
        <Container>
          <Button onClick={goToInfoPost}>
            <Icon
              src={informationIcon}
              alt="Information Icon"
            />
            <SubText>정보글</SubText>
            <SubText>쓰기</SubText>
          </Button>
          <Button onClick={goToGeneralPost}>
            <Icon
              src={writeIcon}
              alt="Write Icon"
            />
            <SubText>자유글</SubText>
            <SubText>쓰기</SubText>
          </Button>
          <Button onClick={handleClick}>
            <Icon
              src={companyIcon}
              alt="Company Icon"
            />
            <SubText>동행</SubText>
            <SubText>구하기</SubText>
          </Button>
        </Container>
      </RoundContainer>

      <SmallSpace />

      <FlexContainer onClick={() => navigate('/community/info')}>
        <Span>
          <RoundIcon src={infoCircleIcon} />
          <MiddleText spacing="1vh">정보 커뮤니티</MiddleText>
        </Span>
        <RightIcon src={rightIcon} />
      </FlexContainer>
      <Shadow>
        <CommunityHomeList
          bgcolor="rgba(191, 216, 229, 0.6)"
          datas={infoData}
          type={'info'}
        />
      </Shadow>

      <SmallSpace />

      <FlexContainer onClick={() => navigate('/community/general')}>
        <Span>
          <RoundIcon src={freeCircleIcon} />
          <MiddleText spacing="1vh">자유 커뮤니티</MiddleText>
        </Span>
        <RightIcon src={rightIcon} />
      </FlexContainer>
      <Shadow>
        <CommunityHomeList
          bgcolor="rgba(203, 205, 233, 0.6)"
          datas={freeData}
          type={'free'}
        />
      </Shadow>

      <SmallSpace />

      <FlexContainer onClick={() => navigate('/accompany')}>
        <Span>
          <RoundIcon src={accompanyCircleIcon} />
          <MiddleText spacing="1vh">동행 구하기</MiddleText>
        </Span>
        <RightIcon src={rightIcon} />
      </FlexContainer>
      <Shadow>
        <CommunityHomeList
          bgcolor="rgba(208, 214, 218, 0.6)"
          datas={accompanyData}
          type={'accom'}
        />
      </Shadow>

      <Space />

      <BottomBanner src={cloudImg} />
      <BottomBanner src={cloudImg} />
      <BottomBanner src={cloudImg} />

      <BigSpace />

      <BottomTabNav />
    </>
  );
}

export default CommunityHomePage;

const BigSpace = styled.div`
  margin-top: 15vh;
`;

const BottomBanner = styled.img`
  width: 90%;
  margin-bottom: 0.5vh;
`;

const Shadow = styled.div`
  filter: drop-shadow(10px 10px 10px rgba(62, 115, 178, 0.15));
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  padding-left: 1.2vh;
`;

const FlexContainer = styled.div`
  margin-top: 1.5rem;
  margin-right: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 1vh;
`;

const RightIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const RoundIcon = styled.img`
  width: 50px;
`;

const MiddleText = styled.div`
  color: #3e73b2;
  margin-right: '0';
  margin-left: 10px;
  font-weight: bold;
  font-family: 'Inter-Regular';
  font-size: 1.4em;
`;

const Space = styled.div`
  margin-top: 7vh;
`;

const SmallSpace = styled.div`
  margin-top: 5vh;
`;

const SubText = styled.div`
  color: #838383;
  font-family: 'Inter-Regular';
  font-size: 0.8em;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 5vh;
  height: 5vh;
  margin-bottom: 1vh;
`;

const Container = styled.div`
  margin-top: 1vh;
  margin-bottom: 1vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vh;
`;

const RoundContainer = styled.div`
  width: 100%;
  border-bottom: 1.5px solid #d9d9d9;
  border-top: 1.5px solid #d9d9d9;
  margin-bottom: 1vh;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 4px 8px rgba(86, 150, 217, 0.25);
`;
