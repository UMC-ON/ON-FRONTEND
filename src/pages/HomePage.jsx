import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardList from '../components/CardList';
import CommunityHomeList from '../components/CommunityHomeList';

// import schoolIcon from '../assets/images/new_school_icon.svg';
// import migrationIcon from '../assets/images/new_immigration_icon.svg';
// import companyIcon from '../assets/images/new_accompany_icon.svg';
// import informationIcon from '../assets/images/new_info_icon.svg';
// import writeIcon from '../assets/images/new_free_icon.svg';
// import diaryIcon from '../assets/images/new_diary_icon.svg';
//import bannerimg from '../assets/images/home_banner.svg';
//import londonImg from '../assets/images/london_gallery.svg';
import rightIcon from '../assets/images/right_arrow.svg';
//import marketImg from '../assets/images/borough_market.svg';
import sliderImage from '../assets/images/slider_image.svg';

const diaryIconData = `<svg width="91" height="186" viewBox="0 0 91 186" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="90.25" y="185.25" width="89.5" height="184.5" rx="10.25" transform="rotate(-180 90.25 185.25)" fill="url(#paint0_linear_3826_2624)" stroke="#D9D9D9" stroke-width="0.5"/>
<circle cx="45.5" cy="140.5" r="21.5" fill="url(#paint1_linear_3826_2624)" fill-opacity="0.3"/>
<path d="M78 148V173H53" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M70.8261 141C71.4744 141 72 141.526 72 142.174V166.826C72 167.474 71.4744 168 70.8261 168H46.1739C45.5256 168 45 167.474 45 166.826V142.174C45 141.526 45.5256 141 46.1739 141H70.8261ZM66 148C66.5523 148 67 148.448 67 149C67 149.552 66.5523 150 66 150H51C50.4477 150 50 149.552 50 149C50 148.448 50.4477 148 51 148H66ZM67 154C67 153.448 66.5523 153 66 153H51C50.4477 153 50 153.448 50 154C50 154.552 50.4477 155 51 155H66C66.5523 155 67 154.552 67 154ZM66 158C66.5523 158 67 158.448 67 159C67 159.552 66.5523 160 66 160H56C55.4477 160 55 159.552 55 159C55 158.448 55.4477 158 56 158H66Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3826_2624" x1="90" y1="185" x2="234.251" y2="254.774" gradientUnits="userSpaceOnUse">
<stop stop-color="#C2C7FF"/>
<stop offset="1" stop-color="#AD99FF"/>
</linearGradient>
<linearGradient id="paint1_linear_3826_2624" x1="24" y1="119" x2="67" y2="162" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>`;
const schoolIconData = `<svg width="192" height="87" viewBox="0 0 192 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="86.25" width="85.5" height="190.5" rx="10.25" transform="rotate(-90 0.75 86.25)" fill="url(#paint0_linear_3826_2575)" stroke="#D9D9D9" stroke-width="0.5"/>
<path d="M134 60C134 58.8954 134.895 58 136 58H139C139.552 58 140 58.4477 140 59V71C140 71.5523 139.552 72 139 72H136C134.895 72 134 71.1046 134 70V60Z" fill="white"/>
<path d="M173 60C173 58.8954 172.105 58 171 58H168C167.448 58 167 58.4477 167 59V71C167 71.5523 167.448 72 168 72H171C172.105 72 173 71.1046 173 70V60Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M153 34H159C159.553 34 160 34.4477 160 35V37C160 37.5523 159.553 38 159 38H154V40.8829L167.584 46.6181C168.347 46.9404 168.704 47.8203 168.382 48.5835C168.06 49.3466 167.18 49.7041 166.417 49.3819L165 48.7838V70C165 71.1046 164.105 72 163 72H160C158.896 72 158 71.1046 158 70V65C158 63.8954 157.38 63 156.616 63H150.385C149.62 63 149 63.8954 149 65V70C149 71.1046 148.105 72 147 72H144C142.896 72 142 71.1046 142 70V48.7186L140.637 49.358C139.887 49.7098 138.994 49.3871 138.642 48.6371C138.291 47.8871 138.613 46.9939 139.363 46.642L152 40.7135V35C152 34.4477 152.448 34 153 34ZM153.5 58C156.538 58 159 55.5376 159 52.5C159 49.4624 156.538 47 153.5 47C150.463 47 148 49.4624 148 52.5C148 55.5376 150.463 58 153.5 58Z" fill="white"/>
<circle cx="141.5" cy="40.5" r="21.5" fill="url(#paint1_linear_3826_2575)" fill-opacity="0.3"/>
<defs>
<linearGradient id="paint0_linear_3826_2575" x1="1" y1="86" x2="142.65" y2="149.37" gradientUnits="userSpaceOnUse">
<stop stop-color="#C2C7FF"/>
<stop offset="1" stop-color="#AD99FF"/>
</linearGradient>
<linearGradient id="paint1_linear_3826_2575" x1="120" y1="19" x2="163" y2="62" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>`;
const migrationIconData = `<svg width="191" height="87" viewBox="0 0 191 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="86.25" width="85.5" height="189.5" rx="10.25" transform="rotate(-90 0.75 86.25)" fill="url(#paint0_linear_3826_2588)" stroke="#D9D9D9" stroke-width="0.5"/>
<path d="M140 44C140 43.4477 139.552 43 139 43H137C136.448 43 136 43.4477 136 44V68C136 68.5523 136.448 69 137 69H172C172.552 69 173 68.5523 173 68V44C173 43.4477 172.552 43 172 43H170C169.448 43 169 43.4477 169 44V64C169 64.5523 168.552 65 168 65H141C140.448 65 140 64.5523 140 64V44Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M142 40C142 39.4477 142.448 39 143 39H166C166.552 39 167 39.4477 167 40V46C167 46.5523 166.552 47 166 47H143C142.448 47 142 46.5523 142 46V40ZM148 43C148 44.1046 147.105 45 146 45C144.895 45 144 44.1046 144 43C144 41.8954 144.895 41 146 41C147.105 41 148 41.8954 148 43ZM151 45C152.105 45 153 44.1046 153 43C153 41.8954 152.105 41 151 41C149.895 41 149 41.8954 149 43C149 44.1046 149.895 45 151 45Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M143 49C142.448 49 142 49.4477 142 50V62C142 62.5523 142.448 63 143 63H166C166.552 63 167 62.5523 167 62V50C167 49.4477 166.552 49 166 49H143ZM146 51.5C145.448 51.5 145 51.9477 145 52.5C145 53.0523 145.448 53.5 146 53.5H152.5C153.052 53.5 153.5 53.0523 153.5 52.5C153.5 51.9477 153.052 51.5 152.5 51.5H146ZM145 57C145 56.4477 145.448 56 146 56H152.5C153.052 56 153.5 56.4477 153.5 57C153.5 57.5523 153.052 58 152.5 58H146C145.448 58 145 57.5523 145 57ZM160 59C162.209 59 164 57.2091 164 55C164 52.7909 162.209 51 160 51C157.791 51 156 52.7909 156 55C156 57.2091 157.791 59 160 59Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M150 71C149.448 71 149 71.4477 149 72V73H145C144.448 73 144 73.4477 144 74C144 74.5523 144.448 75 145 75H164C164.552 75 165 74.5523 165 74C165 73.4477 164.552 73 164 73H160V72C160 71.4477 159.552 71 159 71H150Z" fill="white"/>
<circle cx="141.5" cy="43.5" r="21.5" fill="url(#paint1_linear_3826_2588)" fill-opacity="0.3"/>
<defs>
<linearGradient id="paint0_linear_3826_2588" x1="1" y1="86" x2="142.4" y2="149.593" gradientUnits="userSpaceOnUse">
<stop stop-color="#C2C7FF"/>
<stop offset="1" stop-color="#AD99FF"/>
</linearGradient>
<linearGradient id="paint1_linear_3826_2588" x1="120" y1="22" x2="163" y2="65" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`;
const companyIconData = `<svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" fill="url(#paint0_linear_3826_2623)"/>
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" stroke="#D9D9D9" stroke-width="0.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M67.8333 51.6667C65.6242 51.6667 63.8333 53.4576 63.8333 55.6667V58.7542H61.8182C60.814 58.7542 60 59.4515 60 60.3116V79.0003C60 79.8605 60.814 80.5577 61.8182 80.5577L62.5 80.5577C62.5 81.3605 63.2462 82.0113 64.1667 82.0113C65.0871 82.0113 65.8333 81.3605 65.8333 80.5577H74.1667C74.1667 81.3605 74.9129 82.0113 75.8333 82.0113C76.7538 82.0113 77.5 81.3605 77.5 80.5577L78.1818 80.5577C79.186 80.5577 80 79.8605 80 79.0003V60.3116C80 59.4515 79.186 58.7542 78.1818 58.7542H76.1667V55.6667C76.1667 53.4576 74.3758 51.6667 72.1667 51.6667H67.8333ZM72.1667 58.7542V55.6667L67.8333 55.6667V58.7542H72.1667ZM75 61.7516C75.5523 61.7516 76 62.1993 76 62.7516V76.9239C76 77.4762 75.5523 77.9239 75 77.9239C74.4477 77.9239 74 77.4762 74 76.9239V62.7516C74 62.1993 74.4477 61.7516 75 61.7516ZM66 62.7516C66 62.1993 65.5523 61.7516 65 61.7516C64.4477 61.7516 64 62.1993 64 62.7516V76.9239C64 77.4762 64.4477 77.9239 65 77.9239C65.5523 77.9239 66 77.4762 66 76.9239V62.7516ZM70 61.7516C70.5523 61.7516 71 62.1993 71 62.7516V76.9239C71 77.4762 70.5523 77.9239 70 77.9239C69.4477 77.9239 69 77.4762 69 76.9239V62.7516C69 62.1993 69.4477 61.7516 70 61.7516Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3826_2623" x1="1" y1="1" x2="90" y2="90" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>
`;
const informationIconData = `<svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" fill="url(#paint0_linear_3826_2621)"/>
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" stroke="#D9D9D9" stroke-width="0.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M54.5 55C53.6716 55 53 55.7289 53 56.6281V73.7226C53 74.6217 53.6716 75.3506 54.5 75.3506H60.9873C61.298 75.3506 61.5819 75.5314 61.7201 75.8172L63.5172 79.5335C63.818 80.1555 64.682 80.1555 64.9828 79.5335L66.7799 75.8172C66.9181 75.5314 67.202 75.3506 67.5127 75.3506H78.5C79.3284 75.3506 80 74.6217 80 73.7226V56.6281C80 55.7289 79.3284 55 78.5 55H54.5ZM66.0909 62.5626C66.9946 62.5626 67.7273 63.315 67.7273 64.2431V70.1251C67.7273 71.0533 66.9946 71.8057 66.0909 71.8057C65.1872 71.8057 64.4545 71.0533 64.4545 70.1251V64.2431C64.4545 63.315 65.1872 62.5626 66.0909 62.5626ZM66.0909 61.7223C66.9946 61.7223 67.7273 60.9699 67.7273 60.0417C67.7273 59.1136 66.9946 58.3611 66.0909 58.3611C65.1872 58.3611 64.4545 59.1136 64.4545 60.0417C64.4545 60.9699 65.1872 61.7223 66.0909 61.7223Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3826_2621" x1="1" y1="1" x2="90" y2="90" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>`;
const writeIconData = `<svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" fill="url(#paint0_linear_3826_2622)"/>
<rect x="0.75" y="0.75" width="89.5" height="89.5" rx="10.25" stroke="#D9D9D9" stroke-width="0.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M74.4465 54.1213C73.2749 52.9497 71.3754 52.9497 70.2039 54.1213L54.0126 70.3126C53.5373 70.7879 53.2354 71.409 53.1553 72.0765L52.5358 77.2395C52.3041 79.1697 53.9415 80.8072 55.8718 80.5755L61.0348 79.956C61.7022 79.8759 62.3234 79.574 62.7987 79.0986L78.99 62.9074C80.1615 61.7358 80.1615 59.8363 78.99 58.6648L74.4465 54.1213ZM65.6604 61.4932L55.4268 71.7268C55.2684 71.8852 55.1678 72.0923 55.1411 72.3147L54.5215 77.4777C54.4443 78.1212 54.9901 78.667 55.6335 78.5898L60.7965 77.9702C61.019 77.9435 61.2261 77.8429 61.3845 77.6844L71.6181 67.4508L65.6604 61.4932Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3826_2622" x1="1" y1="1" x2="90" y2="90" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
</defs>
</svg>
`;

// 각 SVG 데이터를 인코딩
const encodedDiaryIcon = encodeURIComponent(diaryIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedSchoolIcon = encodeURIComponent(schoolIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedMigrationIcon = encodeURIComponent(migrationIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedCompanyIcon = encodeURIComponent(companyIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedInformationIcon = encodeURIComponent(informationIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedWriteIcon = encodeURIComponent(writeIconData)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');

import BottomTabNav from '../components/BottomTabNav/BottomTabNav';
import NavBar from '../components/NavBar/NavBar';
//import screenshotImg from '../assets/images/screenshot.svg';
import CardAccompanyList from '../components/CardAccompanyList';
//import CommunityCardList from '../components/CommunityCardList';
import { immigration } from '../assets/immigrationDatabase';
import Loading from '../components/Loading/Loading';

import { getData } from '../api/Functions';
import {
  GET_USER_INFO,
  GET_TWO_FREEPOST,
  GET_RECENT_POST_OF,
  GET_NEAR_ACCOMPANY,
} from '../api/urls';

const images = [
  sliderImage,
  sliderImage,
  sliderImage,
  sliderImage,
  sliderImage,
];
import { cities, countries } from '../assets/cityDatabase';
import ErrorScreen from '../components/ErrorScreen';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAccom, setIsLoadingAccom] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [freeData, setFreeData] = useState([]);
  const [accompanyData, setAccompanyData] = useState([]);
  const [univLink, setUnivLink] = useState('');
  const [immigrationLink, setImmigrationLink] = useState('');

  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  function goToAccompany() {
    navigate('/accompany');
  }

  function goToGeneralPost() {
    navigate('/community/general/post');
  }

  function goToInfoPost() {
    navigate('/community/info/post');
  }

  function goToInfoCommunity() {
    navigate('/community/info');
  }

  function goToGeneralCommunity() {
    navigate('/community/general');
  }

  function goToAccompany() {
    navigate('/accompany');
  }

  function goToDiary() {
    navigate('/diary');
  }

  function goToCollege() {
    if (univLink != '') {
      window.location.href = univLink;
    } else {
      alert('파견교를 인증해주세요.');
    }
  }

  function goToMigration() {
    if (immigrationLink != '') {
      window.location.href = immigrationLink;
    }
  }

  function getSiteByCountry(countryName) {
    const countryData = immigration.find(
      (item) => item.country === countryName,
    );
    if (countryData) {
      // console.log(countryData.site);
      setImmigrationLink(countryData.site);
    } else {
      //console.log('not found');
    }
  }

  const getContinentForCountry = (countryName) => {
    // console.log('country is ');
    // console.log(countryName);
    const country = countries.find((c) => c.country === countryName);
    return country.continent;
  };

  useEffect(() => {
    // console.log(immigrationLink);
  }, [immigrationLink]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const user_data = await getData(GET_USER_INFO, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        setUserData([user_data.data]);
        // console.log('userData');
        // console.log(user_data.data);
        if (user_data.data.universityUrl) {
          setUnivLink(user_data.data.universityUrl);
        }
        if (user_data.data.country) {
          getSiteByCountry(user_data.data.country);
        }

        const info_data = await getData(GET_RECENT_POST_OF('INFO'), {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        setInfoData(info_data.data);
        // console.log('infoData');
        // console.log(info_data.data);

        const free_data = await getData(GET_RECENT_POST_OF('FREE'), {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        setFreeData(free_data.data);

        const accom_data = await getData(GET_NEAR_ACCOMPANY, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        if (accom_data) {
          setAccompanyData(accom_data.data);
          // console.log(accom_data.data.result);
        } else {
          setAccompanyData([]);
        }
      } catch (error) {
        return <ErrorScreen/>
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Data fetched, stop showing main loading
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('AToken');
    // console.log('AToken:', token);

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
        return <ErrorScreen/>
        // console.error('Error fetching data:', error);
        setAccompanyData([]);
      } finally {
        setIsLoadingAccom(false); // Accom data fetched, stop showing accom loading
      }
    };

    if (userData.country) {
      // console.log(userData);
      fetchAccomData();
    }
  }, [userData.country]);

  if (isLoading && isLoadingAccom) {
    return <Loading />;
  }

  return (
    <>
      <NavBar></NavBar>
      <Space></Space>
      <BigContainer>
        {userData &&
          userData.map((card, index) => (
            <div key={index}>
              <LeftContainer>
                <SubText>나의 파견교</SubText>
              </LeftContainer>
              {card.country ? (
                <LeftContainer>
                  <BigText spacing="1vh">{card.country},</BigText>
                  <BigText color="#3E73B2">{card.dispatchedUniversity}</BigText>
                </LeftContainer>
              ) : (
                <LeftContainer>
                  <BigText
                    spacing="1vh"
                    color="#3E73B2"
                  >
                    학교가 인증되지 않았어요
                  </BigText>
                </LeftContainer>
              )}
            </div>
          ))}

        {userData.map((card, index) => (
          <Container key={index}>
            <Button onClick={goToDiary}>
              <Icon
                $iconType="diaryIcon"
                $ratio="1 / 2.1"
              >
                <WhiteText>일기쓰기</WhiteText>
              </Icon>
            </Button>
            <Button onClick={goToCollege}>
              <Icon
                $iconType="schoolIcon"
                $ratio="2.1 / 1"
              >
                <WhiteText>파견교 홈페이지</WhiteText>
              </Icon>
            </Button>
            {card.country ? (
              <Button onClick={goToMigration}>
                <Icon
                  $iconType="migrationIcon"
                  $ratio="2.1 / 1"
                >
                  <WhiteText>{card.country} 이민국</WhiteText>
                </Icon>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  (window.location.href = 'https://www.mofa.go.kr/www/index.do')
                }
              >
                <Icon
                  $iconType="migrationIcon"
                  $ratio="2.1 / 1"
                >
                  <WhiteText>한국 외교부</WhiteText>
                </Icon>
              </Button>
            )}
            <Button onClick={goToInfoCommunity}>
              <Icon
                $iconType="informationIcon"
                $ratio="1 / 1"
              >
                <SmallWhiteText>
                  정보
                  <br />
                  게시판
                </SmallWhiteText>
              </Icon>
            </Button>
            <Button onClick={goToGeneralCommunity}>
              <Icon
                $iconType="writeIcon"
                $ratio="1 / 1"
              >
                <SmallWhiteText>
                  자유
                  <br />
                  게시판
                </SmallWhiteText>
              </Icon>
            </Button>
            <Button onClick={goToAccompany}>
              <Icon
                $iconType="companyIcon"
                $ratio="1 / 1"
              >
                <SmallWhiteText>
                  동행
                  <br />
                  구하기
                </SmallWhiteText>
              </Icon>
            </Button>
          </Container>
        ))}

        {/* <Space/> */}

        {/* <LeftContainer>
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
            </DotContainer> */}
      </BigContainer>

      <SmallSpace />

      {userData.map((card, index) => (
        <div key={index}>
          {card.country ? (
            <BlueContainer key={index}>
              <BigContainer>
                <LeftContainer>
                  <BigText spacing="1vh">나를 위한</BigText>
                  <BigText color="#3E73B2">
                    {getContinentForCountry(card.country)} 인기 여행지
                  </BigText>
                </LeftContainer>
              </BigContainer>

              <FixContainer>
                <CardList selectedCountry={card.country} />
                <OverlayBox />
              </FixContainer>

              {/* <PageContainer>
              <OverlayBox/>
              </PageContainer> */}
            </BlueContainer>
          ) : null}
        </div>
      ))}

      <FlexContainer onClick={goToInfoCommunity}>
        <BigText spacing="1rem">최신 정보글</BigText>
        <RightIcon src={rightIcon}></RightIcon>
      </FlexContainer>
      <SmallSpace2 />

      <Shadow>
        <CommunityHomeList
          bgcolor="rgba(191, 216, 229, 0.3)"
          datas={infoData}
          type={'info'}
        />
      </Shadow>

      <Space></Space>
      <Space></Space>

      <FlexContainer onClick={goToGeneralCommunity}>
        <BigText spacing="1rem">최신 자유글</BigText>
        <RightIcon src={rightIcon}></RightIcon>
      </FlexContainer>

      <SmallSpace2 />

      <Shadow>
        <CommunityHomeList
          bgcolor="rgba(203, 205, 233, 0.3)"
          datas={freeData}
          type={'free'}
        />
      </Shadow>

      <Space></Space>
      <Space></Space>

      <FlexContainer onClick={goToAccompany}>
        <BigText spacing="1vh">내 주변 동행글</BigText>
        <RightIcon src={rightIcon} />
      </FlexContainer>
      <SmallSpace />

      <FixContainer>
        <CardAccompanyList cards={accompanyData}></CardAccompanyList>
        <OverlayBox />
      </FixContainer>

      {/* {userData.map((card, index) => (
            card.country && accompanyData.length > 0 ? (
              <FixContainer key={index}>
                <CardAccompanyList cards={accompanyData}></CardAccompanyList>
                <OverlayBox/>
              </FixContainer>
            ) : 
            <LeftContainer>
              <LeftSpace/>
              <SubText>아무것도 없습니다.</SubText>
            </LeftContainer>
          ))} */}
      <BigSpace />

      <BottomTabNav></BottomTabNav>
    </>
  );
}

export default HomePage;

const Shadow = styled.div`
  filter: drop-shadow(10px 10px 10px rgba(62, 115, 178, 0.15));
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const FlexContainer = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-bottom: 0px;
  cursor: pointer;
`;

const FixContainer = styled.div`
  position: relative;
`;

const RightIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const Space = styled.div`
  margin-top: 4rem;
`;

const SmallSpace = styled.div`
  margin-top: 2rem;
`;

const SmallSpace2 = styled.div`
  margin-top: 1.5rem;
`;

const BigSpace = styled.div`
  margin-top: 7.5rem;
`;

const BigContainer = styled.div`
  padding: 1.5rem;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SubText = styled.div`
  color: #5c5c5c;
  font-family: 'Inter';
  font-size: 1em;
`;

const WhiteText = styled.div`
  color: #ffffff;
  font-family: 'Inter';
  font-weight: bold;
  font-size: 1.2em;
  padding-top: 15px;
  text-align: left;
  padding-left: 15px;
`;

const SmallWhiteText = styled.div`
  color: #ffffff;
  font-family: 'Inter';
  font-weight: bold;
  font-size: 1em;
  padding-top: 15px;
  text-align: left;
  padding-left: 15px;
`;

const BigText = styled.div`
  margin-top: 1vh;
  color: ${(props) => props.color || '#000000'};
  margin-right: ${(props) => props.spacing || '0'};
  font-weight: bold;
  font-family: 'Inter';
  font-size: ${(props) => props.size || '1.35em'};
  margin-bottom: 0.9vh;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  max-width: 90%;
`;

const MiddleText = styled.div`
  color: ${(props) => props.color || '#000000'};
  margin-right: ${(props) => props.spacing || '0'};
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
  aspect-ratio: ${(props) => props.$ratio || '1 / 2'};
  background-image: ${(props) => {
    switch (props.$iconType) {
      case 'diaryIcon':
        return `url('data:image/svg+xml,${encodedDiaryIcon}')`;
      case 'schoolIcon':
        return `url('data:image/svg+xml,${encodedSchoolIcon}')`;
      case 'migrationIcon':
        return `url('data:image/svg+xml,${encodedMigrationIcon}')`;
      case 'informationIcon':
        return `url('data:image/svg+xml,${encodedInformationIcon}')`;
      case 'writeIcon':
        return `url('data:image/svg+xml,${encodedWriteIcon}')`;
      case 'companyIcon':
        return `url('data:image/svg+xml,${encodedCompanyIcon}')`;
      default:
        return '';
    }
  }};
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
  shouldForwardProp: (prop) => !['currentSlide'].includes(prop),
})`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(-${props.currentSlide * 100}%)`};
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
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  width: ${(props) => (props.active ? '8px' : '5px')};
  height: ${(props) => (props.active ? '8px' : '5px')};
  margin: ${(props) => (props.active ? '0 5px' : '2px 5px')};
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#3E73B2' : '#A3A3A3')};
  opacity: ${(props) => (props.active ? '1' : '0.5')};
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
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
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
  background-color: red;
`;
