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
import { loadUser, logout, saveScrollStatus } from '../../redux/actions.jsx';
import ErrorScreen from '../../components/ErrorScreen.jsx';
import PostPage from './PostPage.jsx';

const images = [communityBannerImg, communityBannerImg, communityBannerImg];

const CommunityHome = ({ boardType, color1, color2 }) => {
  let userInfo = useSelector((state) => state.user.user);
  let scrollInfo = useSelector((state) => state.scroll);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCountry, setShowCountry] = useState(false); //모달창
  const [country, setCountry] = useState(null); //선택된 국가
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [postList, setPostList] = useState(scrollInfo.itemList);
  const totalPage = useRef(scrollInfo.totalPage);
  const currentPage = useRef(scrollInfo.page);
  const newDataLoading = useRef(false);

  history.scrollRestoration = 'auto';

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
      { page: currentPage.current, size: 20, sort: 'DESC' },
    )
      .then((response) => {
        totalPage.current = response.data.totalPages;
        if (currentPage.current > 0) {
          setPostList((postList) => [...postList, ...response.data.content]);
          //console.log('내용 존재');
        } else {
          setPostList(response.data.content);
          //console.log('이거 실행');
        }
        setIsError(false);
        return response;
      })
      .catch((error) => {
        setIsError(true);
      });
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
        //console.log('내용 존재');
      } else {
        setPostList(response.data.content);
        //console.log('이거 실행');
      }
    }
  };

  useEffect(() => {
    //console.log('유저인포');
    //console.log(userInfo);
    console.log(postList);
    if (postList.length === 0) {
      if (country === null) {
        fetchData();
        setIsLoading(false);
      } else {
        fetchFilteredData();
        setIsLoading(false);
      }
    }
  }, [country, userInfo, postList]);

  const onScroll = async () => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 50
    ) {
      console.log(totalPage.current);
      if (
        !isLoading &&
        !newDataLoading.current &&
        currentPage.current < totalPage.current
      ) {
        currentPage.current++;
        if (country === null) {
          await fetchData();
        } else {
          await fetchFilteredData();
        }

        newDataLoading.current = false;
      }
    }
  };

  useEffect(() => {
    let throttleCheck = false;
    if (!throttleCheck) {
      throttleCheck = setTimeout(() => {
        onScroll();
        throttleCheck = false;
      }, 10000);
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(throttleCheck);
    };
  }, []);

  useEffect(() => {
    dispatch(
      saveScrollStatus(totalPage.current, currentPage.current, postList),
    );
  }, [postList]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorScreen />;
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
            onClick={handleCountryClick}
            style={{ fontFamily: 'Inter' }}
          >
            {country ? `${country}` : '국가'}
            {!country && <s.Icon src={arrowIcon} />}

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
