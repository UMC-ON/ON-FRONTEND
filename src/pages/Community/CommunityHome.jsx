import * as s from './CommunityStyled.jsx';

import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import DotInslideSlider from '../../components/DotInsideSlider.jsx';
import CommunityPost from '../../components/CommunityPost/CommunityPost.jsx';
import arrowIcon from '../../assets/images/bottomArrow.svg';
import whiteCloseIcon from '../../assets/images/whiteCloseIcon.svg';
import SelectCountry from '../SelectCountry/SelectCountry.jsx';
import Loading from '../../components/Loading/Loading.jsx';

import communityBannerImg from '../../assets/images/communityBannerImg.svg';
import pencilImg from '../../assets/images/pencil.svg';
import gradientRec from '../../assets/images/gradientRec.svg';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getData } from '../../api/Functions.jsx';
import { GET_FILTERED_POST_IN, GET_POST_OF } from '../../api/urls.jsx';
import { loadUser, logout } from '../../redux/actions.jsx';

const images = [communityBannerImg, communityBannerImg, communityBannerImg];

const CommunityHome = ({ boardType, color1, color2 }) => {
  let userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [showCountry, setShowCountry] = useState(false); //모달창
  const [country, setCountry] = useState(null); //선택된 국가
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState(null);

  const handleCountryClick = () => {
    setShowCountry(!showCountry);
  };
  const resetCountry = () => {
    setCountry(null);
  };

  const nav = () => {
    if (!userInfo) {
      if (confirm('로그인이 필요합니다!!.')) {
        navigate('/signUp');
        return null;
      } else {
        return null;
      }
    }
    navigate('./post');
  };
  const currentBoardType = boardType;

  //let response;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('유저인포');
    console.log(userInfo);
    if (userInfo) {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await getData(GET_POST_OF(currentBoardType), {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        });
        if (response) {
          //console.log(response.data.imageUrls);
          setPostList(response.data);
        }
        return response;
      };
      const fetchFilteredData = async () => {
        setIsLoading(true);
        const response = await getData(
          GET_FILTERED_POST_IN(currentBoardType),
          {
            Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          },
          { country },
        );
        if (response) {
          setPostList(response.data);
        }
      };
      if (country === null) {
        fetchData();
        setIsLoading(false);
      } else {
        fetchFilteredData();
        setIsLoading(false);
      }
    }
  }, [country, userInfo]);

  if (isLoading) {
    return <Loading />;
  }

  if (userInfo) {
    return (
      <>
        <s.PageContainer>
          <PageHeader
            pageName={boardType === 'INFO' ? '정보 게시판' : '자유 게시판'}
            color={boardType === 'INFO' ? '#3E73B2' : '#6458BF'}
          ></PageHeader>
          <s.SliderWrapper>
            <DotInslideSlider images={images}></DotInslideSlider>
          </s.SliderWrapper>

          <s.FilterSection>
            <s.GreyPicker
              $isCountryClicked={country}
              color1={color1}
              color2={color2}
            >
              <span onClick={handleCountryClick}>
                {country ? `${country}` : '국가'}
                {!country && <s.Icon src={arrowIcon} />}
              </span>
              {country && (
                <s.Icon
                  src={whiteCloseIcon}
                  onClick={resetCountry}
                />
              )}
            </s.GreyPicker>
          </s.FilterSection>
          <s.PostListSection>
            {postList && postList.length > 0 ? (
              postList.map((post) => {
                console.log(post);
                return (
                  <CommunityPost
                    key={post.postId}
                    post={post}
                    postImg={post.imageUrls[0]}
                  />
                );
              })
            ) : (
              <div style={{ padding: '5rem 0' }}>아직 글이 없습니다.</div>
            )}
          </s.PostListSection>
          <s.WriteButton
            style={{
              background: `linear-gradient(135deg,${color1},${color2})`,
            }}
            onClick={nav}
          >
            <img src={pencilImg} />
            글쓰기
          </s.WriteButton>
          <img
            src={gradientRec}
            style={{
              position: 'fixed',
              bottom: '0',
              pointerEvents: 'none',
              zIndex: '1',
              width: '100%',
              maxWidth: '480px',
            }}
          />

          {showCountry && (
            <SelectCountry
              closeModal={() => {
                setShowCountry(!showCountry);
              }}
              getCountry={(country) => {
                setCountry(country);
                setShowCountry(false);
              }}
            />
          )}
        </s.PageContainer>
      </>
    );
  }
};

export default CommunityHome;
