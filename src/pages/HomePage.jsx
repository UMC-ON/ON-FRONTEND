import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardList from '../components/CardList';

import schoolIcon from '../assets/images/new_school_icon.svg';
import migrationIcon from '../assets/images/new_immigration_icon.svg';
import companyIcon from '../assets/images/new_accompany_icon.svg';
import informationIcon from '../assets/images/new_info_icon.svg';
import writeIcon from '../assets/images/new_free_icon.svg';
import diaryIcon from '../assets/images/new_diary_icon.svg';
import bannerimg from '../assets/images/home_banner.svg';
import londonImg from '../assets/images/london_gallery.svg';
import rightIcon from '../assets/images/right_arrow.svg';
import marketImg from '../assets/images/borough_market.svg';
import sliderImage from '../assets/images/slider_image.svg';


import BottomTabNav from '../components/BottomTabNav/BottomTabNav';
import NavBar from '../components/NavBar/NavBar';
import screenshotImg from '../assets/images/screenshot.svg'
import CardAccompanyList from '../components/CardAccompanyList';
import CommunityCardList from '../components/CommunityCardList';
import { immigration } from '../assets/immigrationDatabase';
import Loading from '../components/Loading/Loading';

import { getData } from '../api/Functions';
import { GET_USER_INFO, GET_TWO_FREEPOST, GET_TWO_INFOPOST, GET_NEAR_ACCOMPANY } from '../api/urls';


const images = [sliderImage, sliderImage, sliderImage, sliderImage, sliderImage];
import { cities } from '../assets/cityDatabase';


function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAccom, setIsLoadingAccom] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [userData, setUserData] = useState([]);
    const [infoData, setInfoData] = useState([]);
    const [freeData, setFreeData] = useState([]);
    const [accompanyData, setAccompanyData] = useState([]);
    const [univLink, setUnivLink] = useState("");
    const [immigrationLink, setImmigrationLink] = useState('');

    const navigate = useNavigate();



    const handlers = useSwipeable({
      onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % images.length),
      onSwipedRight: () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };


    function goToAccompany() {
      navigate("/accompany");
    }

    function goToGeneralPost() {
      navigate("/community/general/post");
    }

    function goToInfoPost() {
      navigate("/community/info/post");
    }

    function goToInfoCommunity() {
      navigate("/community/info");
    }

    function goToGeneralCommunity() {
      navigate("/community/general");
    }

    function goToAccompany() {
      navigate("/accompany");
    }

    function goToDiary() {
      navigate("/diary");
    }

    function goToCollege() {
      if (univLink != "")
      {
        window.location.href = univLink;
      }
    }

    function goToMigration() {
      if (immigrationLink != "")
      {
      window.location.href = immigrationLink;
      }
    }


    function getSiteByCountry(countryName) {
      const countryData = immigration.find(item => item.country === countryName);
      if(countryData)
      {
        // console.log(countryData.site);
        setImmigrationLink(countryData.site);
      }
      else
      {
        console.log("not found");
      }
    }

    const getContinentForCountry = (countryName) => {
      const country = cities.find(c => c.country === countryName);
      return country.continent;
    };

    useEffect(() => {
      // console.log(immigrationLink); 
    }, [immigrationLink]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          const user_data = await getData(GET_USER_INFO,{
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          }); 
          setUserData([user_data.data]);
          console.log("userData");
          console.log(user_data.data);
          if (user_data.data.universityUrl)
          {
          setUnivLink(user_data.data.universityUrl);
          }
          if (user_data.data.country)
          {
          getSiteByCountry(user_data.data.country);
          }
          
          const info_data = await getData(GET_TWO_INFOPOST,{
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          }); 
          setInfoData(info_data.data);
          console.log("infoData");
          console.log(info_data.data);

          const free_data = await getData(GET_TWO_FREEPOST,{
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          }); 
          setFreeData(free_data.data);

          const accom_data = await getData(GET_NEAR_ACCOMPANY,{
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          }); 
          if (accom_data)
          {
            setAccompanyData(accom_data.data);
            // console.log(accom_data.data.result);
          }
          else
          {
            setAccompanyData([]);
          }

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Data fetched, stop showing main loading
        }
      };
  
      fetchData(); 
    }, []); 

    useEffect(() => {
      const token = localStorage.getItem('AToken');
      console.log('AToken:', token);

      const fetchAccomData = async () => {
        try {
          setIsLoadingAccom(true);
          const accom_data = await getData(GET_NEAR_ACCOMPANY, {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          });
    

          if (accom_data && accom_data.data && accom_data.data.result) {
            setAccompanyData(accom_data.data.result);
          } else {
            setAccompanyData([]); 
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setAccompanyData([]); 
        } finally {
          setIsLoadingAccom(false); // Accom data fetched, stop showing accom loading
        }
      };
    
      if (userData.country)
      {
        // console.log(userData);
        fetchAccomData();
      }
    }, [userData.country]);

    if (isLoading && isLoadingAccom) {
      return <Loading/>;
    }

    return (
      <>
        <NavBar></NavBar>
        <Space></Space>
        <BigContainer>
            {userData.map((card, index) => (
              <div key={index}>
              <LeftContainer>
                  <SubText>나의 파견교</SubText>
              </LeftContainer>
              {card.country?
              <LeftContainer>
                  <BigText spacing="1vh">{card.country},</BigText>
                  <BigText color="#3E73B2">{card.dispatchedUniversity}</BigText>
              </LeftContainer>
              :
              <LeftContainer>
                  <BigText spacing="1vh">학교가 인증되지 않았어요.</BigText>
              </LeftContainer>
              }
              </div>
             ))}
            
            {userData.map((card, index) => (
            <Container key={index}>
                <Button onClick={goToDiary}>
                  <Icon $iconType='diaryIcon' $ratio='1 / 2.1'>
                    <WhiteText>일기쓰기</WhiteText>
                  </Icon>
                </Button>
                <Button onClick={goToCollege}>
                  <Icon $iconType='schoolIcon' $ratio='2.1 / 1'>
                    <WhiteText>파견교 홈페이지</WhiteText>
                  </Icon>
                </Button>
                {card.country?
                <Button onClick={goToMigration}>
                    <Icon $iconType='migrationIcon' $ratio='2.1 / 1'>
                      <WhiteText>영국 이민국</WhiteText>
                    </Icon>
                </Button>
                :
                <Button onClick={() => window.location.href = "https://www.mofa.go.kr/www/index.do"}>
                    <Icon $iconType='migrationIcon' $ratio='2.1 / 1'>
                    <WhiteText>한국 외교부</WhiteText>
                    </Icon>
                </Button>
                }
                <Button onClick={goToInfoPost}>
                  <Icon $iconType='informationIcon' $ratio='1 / 1'>
                  <SmallWhiteText>정보<br/>글쓰기</SmallWhiteText>
                  </Icon>
                </Button>
                <Button onClick={goToGeneralPost}>
                  <Icon $iconType='writeIcon' $ratio='1 / 1'>
                    <SmallWhiteText>자유<br/>글쓰기</SmallWhiteText>
                  </Icon>
                </Button>
                <Button onClick={goToAccompany}>
                  <Icon $iconType='companyIcon' $ratio='1 / 1'>
                  <SmallWhiteText>동행<br/>구하기</SmallWhiteText>
                  </Icon>
                </Button>
            </Container>
            ))}
           
           <Space/>
           <LeftContainer>
                  <BigText spacing="1vh">나를 위한 </BigText>
                  <BigText color="#3E73B2">꿀팁 정보</BigText>
           </LeftContainer>

            <SliderContainer {...handlers}>
                <SliderWrapper currentSlide={currentSlide}>
                    {images.map((image, index) => (
                        <Slide key={index} style={{ backgroundImage: `url(${image})` }} />
                    ))}
                </SliderWrapper>
            </SliderContainer>
            <DotContainer>
                {images.map((_, index) => (
                <Dot key={index} active={index === currentSlide} onClick={() => goToSlide(index)} />
                ))}
            </DotContainer>
          </BigContainer>
          
          <SmallSpace/>
          
          {userData.map((card, index) => (
            <div key={index}>
              {card.country?
              <BlueContainer key = {index}>
                <BigContainer>
                    <LeftContainer>
                    <BigText spacing="1vh">나를 위한</BigText>
                    <BigText color="#3E73B2">{getContinentForCountry(card.country)} 인기 여행지</BigText>
                    </LeftContainer>
                </BigContainer>

                <FixContainer>
                  <CardList selectedCountry={card.country}/>
                  <OverlayBox/>
                </FixContainer>
                
              {/* <PageContainer>
              <OverlayBox/>
              </PageContainer> */}
              </BlueContainer>
              
          :null}
          </div>
          ))}

     

          <FlexContainer onClick={goToInfoCommunity}>
              <MiddleText spacing="1vh">최신 정보글</MiddleText>
              <RightIcon src={rightIcon}></RightIcon>
          </FlexContainer>
          <SmallSpace2/>

          <CommunityCardList cards={infoData}/>

          <Space></Space>
          <Space></Space>

          <FlexContainer onClick={goToGeneralCommunity}>
              <MiddleText spacing="1vh">최신 자유글</MiddleText>
              <RightIcon src={rightIcon}></RightIcon>
          </FlexContainer>

          <SmallSpace2/>

          <CommunityCardList free={true} cards={freeData}/>
          

          <Space></Space>
          <Space></Space>

          {userData.map((card, index) => (
            card.country && accompanyData.length > 0 ? (
              <FlexContainer onClick={goToAccompany} key={index}>
                <MiddleText spacing="1vh">내 주변 동행글</MiddleText>
                <RightIcon src={rightIcon} />
              </FlexContainer>
            ) : null
          ))}
          <SmallSpace/>

          <FixContainer>
            <CardAccompanyList cards={accompanyData}></CardAccompanyList>
            <OverlayBox/>
          </FixContainer>
          <BigSpace/>


          <BottomTabNav></BottomTabNav>
        </>
    );
}

export default HomePage;

const FlexContainer = styled.div`
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 10px; 
`;

const FixContainer = styled.div`
  position: relative;
`;

const RightIcon = styled.img`
  width: 15px; 
  height: 15px; 
`;

const Space = styled.div`
  margin-top: 8vh;
`;

const SmallSpace = styled.div`
  margin-top: 4vh;
`;

const SmallSpace2 = styled.div`
  margin-top: 3vh;
`;

const BigSpace = styled.div`
  margin-top: 15vh;
`;

const BigContainer = styled.div`
    padding: 1.5rem;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SubText = styled.div`
  color: #5C5C5C;
  font-family: 'Inter-Bold';
  font-size: 1em;
`;

const WhiteText = styled.div`
  color: #FFFFFF;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 1.2em;
  padding-top: 15px;
  text-align: left;
  padding-left: 15px;
`;

const SmallWhiteText = styled.div`
  color: #FFFFFF;
  font-family: 'Inter-Bold';
  font-weight: bold;
  font-size: 1em;
  padding-top: 15px;
  text-align: left;
  padding-left: 15px;
`;

const BigText = styled.div`
  margin-top: 1vh;
  color: ${props => props.color || '#000000'};
  margin-right: ${props => props.spacing || '0'};
  font-weight: bold;
  font-family: 'Inter-Regular';
  font-size: 1.5em;
  margin-bottom: 2vh;
`;

const MiddleText = styled.div`
  color: ${props => props.color || '#000000'};
  margin-right: ${props => props.spacing || '0'};
  font-weight: bold;
  font-family: 'Inter-Regular';
  font-size: 1.2em;
`;


const Container = styled.div`
  margin: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: repeat(2, 1fr); 
  justify-content: space-evenly;
  gap: 10px; 

  /* First button spans two rows (vertical) */
  & > button:nth-child(1) {
    grid-row: span 2; /* Takes up two rows */
    grid-column: 1; /* First column */
  }

  /* Second button */
  & > button:nth-child(2) {
    grid-row: 1; /* First row */
    grid-column: 2 / 4; /* Second column */
  }

  /* Third button */
  & > button:nth-child(3) {
    grid-row: 2; /* Second row */
    grid-column: 2 / 4; /* Third column */
  }

  /* Fourth button */
  & > button:nth-child(4) {
    grid-row: 3; /* Second row */
    grid-column: 1 / 2; /* Third column */
  }

  /* Fifth button */
  & > button:nth-child(5) {
    grid-row: 3; /* Second row */
    grid-column: 2 / 3; /* Third column */
  }

  /* Sixth button */
  & > button:nth-child(6) {
    grid-row: 3; /* Second row */
    grid-column: 3 / 4; /* Third column */
  }
`;


const Button = styled.button`
  background: white;
  border: none; /* Remove default button border */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
  display: flex; /* Use flex to center content */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

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

const Icon = styled.div`
  width: 100%; 
  aspect-ratio: ${props => props.$ratio || '1 / 2'};
  background-image: url(${(props) => {
    switch (props.$iconType) {
      case 'diaryIcon':
        return diaryIcon;
      case 'schoolIcon':
        return schoolIcon;
      case 'migrationIcon':
        return migrationIcon;
      case 'informationIcon':
        return informationIcon;
      case 'writeIcon':
        return writeIcon;
      case 'companyIcon':
        return companyIcon;
      default:
        return '';
    }
  }});
  background-size: contain; /* Ensure the image fits within the div */
  background-repeat: no-repeat; /* Prevent repeating of the image */
  background-position: center; /* Center the image */
  position: relative; /* Allows placement of text */
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
`;


const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-top: 1.5vh;
  overflow: hidden;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.1));
  
`;

const SliderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['currentSlide'].includes(prop)
})`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${props => `translateX(-${props.currentSlide * 100}%)`};
`;

const Slide = styled.div`
  min-width: 100%;
  padding-bottom: 33%; /* Adjust this according to the image aspect ratio */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1/0.385;
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5vh;
`;

const Dot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})`
  width: ${props => (props.active ? '8px' : '5px')};
  height: ${props => (props.active ? '8px' : '5px')};
  margin: ${props => (props.active ? '0 5px' : '2px 5px')};
  border-radius: 50%;
  background-color: ${props => (props.active ? '#3E73B2' : '#A3A3A3')};
  opacity: ${props => (props.active ? '1' : '0.5')};
  cursor: pointer;
`;

const BlueContainer = styled.div`
  margin-top: 1vh;
  width: 100%;
`;

const OverlayBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px; /* Adjust the width to control how much of the right side is covered */
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  z-index: 1;
  pointer-events: none;
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
  background-color:red;
`;