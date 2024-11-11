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
import { useState, useEffect, useRef } from 'react';
import { getData } from '../../api/Functions.jsx';
import { GET_FILTERED_POST_IN, GET_POST_OF } from '../../api/urls.jsx';
import { throttle } from 'rxjs';

const images = [communityBannerImg, communityBannerImg, communityBannerImg];

const CommunityHome = ({ boardType, color1, color2 }) => {
  let userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [showCountry, setShowCountry] = useState(false); //모달창
  const [country, setCountry] = useState(null); //선택된 국가
  const [isLoading, setIsLoading] = useState(false);
  const [postList, setPostList] = useState(null);
  const totalPage = useRef(0);
  const currentPage = useRef(0);
  const newDataLoading = useRef(false);

  const handleCountryClick = () => {
    setShowCountry(!showCountry);
  };
  const resetCountry = () => {
    setCountry(null);
    currentPage.page = 0;
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

  const fetchData = async () => {
    if (currentPage.current == 0) {
      setIsLoading(true);
    } else {
      newDataLoading.current = true;
    }
    const response = await getData(
      GET_POST_OF(currentBoardType),
      {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      },
      { page: currentPage.current, size: 5, sort: 'DESC' },
    );
    if (response) {
      totalPage.current = response.data.totalPages;
      if (currentPage.current > 0) {
        setPostList((postList) => [...postList, ...response.data.content]);
        console.log('내용 존재');
      } else {
        setPostList(response.data.content);
        console.log('이거 실행');
      }
    }
    return response;
  };
  const fetchFilteredData = async () => {
    if (currentPage.current == 0) {
      setIsLoading(true);
    } else {
      newDataLoading.current = true;
    }
    const response = await getData(
      GET_FILTERED_POST_IN(currentBoardType),
      {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      },
      { country: country, page: currentPage.current, size: 5, sort: 'DESC' },
    );
    if (response) {
      totalPage.current = response.data.totalPages;
      if (currentPage.current > 0) {
        setPostList((postList) => [...postList, ...response.data.content]);
        console.log('내용 존재');
      } else {
        setPostList(response.data.content);
        console.log('이거 실행');
      }
    }
  };

  //let response;
  useEffect(() => {
    console.log('유저인포');
    console.log(userInfo);
    if (userInfo) {
      if (country === null) {
        fetchData();
        setIsLoading(false);
      } else {
        fetchFilteredData();
        setIsLoading(false);
      }
    }
  }, [country, userInfo]);

  const onScroll = async () => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 50
    ) {
      if (
        !isLoading &&
        !newDataLoading.current &&
        currentPage.current < totalPage.current
      ) {
        currentPage.current++;
        console.log(currentPage.current);
        console.log(totalPage.current);
        console.log(isLoading);
        if (country === null) {
          await fetchData();
        } else {
          await fetchFilteredData();
        }
        console.log(isLoading);
        newDataLoading.current = false;
      }
    }
  };

  let throttleCheck = false;
  if (!throttleCheck) {
    throttleCheck = setTimeout(() => {
      onScroll();
      throttleCheck = false;
    }, 10000);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [throttleCheck]);

  if (isLoading) {
    return <Loading />;
  }

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
                  postImg={post.imageUrls ? post.imageUrls[0] : null}
                />
              );
            })
          ) : (
            <div style={{ padding: '5rem 0' }}>아직 글이 없습니다.</div>
          )}
          {postList && postList.length > 0 && (
            <s.PaddingDiv>마지막 게시글입니다.</s.PaddingDiv>
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
              currentPage.current = 0;
              setShowCountry(false);
            }}
          />
        )}
      </s.PageContainer>
    </>
  );
};

export default CommunityHome;
