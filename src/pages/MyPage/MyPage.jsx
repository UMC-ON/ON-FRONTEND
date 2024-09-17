import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import * as s from './MyPageStyled';
import theme from '../../styles/theme';

import { PUT_NICKNAME, PUT_UNIV } from '../../api/urls';
import { getData, postData, putData } from '../../api/Functions';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';

const MyPage = () => {
  // const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null); // 에러를 저장할 상태
  const [isLoading, setIsLoading] = useState(false);

  const [editSchoolName, setEditSchoolName] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [originalSchoolName, setOriginalSchoolName] = useState('');

  const [editLink, setEditLink] = useState(false);
  const [link, setLink] = useState('');
  const [originalLink, setOriginalLink] = useState('');

  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');

  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);

  //상태 체크 더미데이터
  const userTest = {
    dispatchedUniversity: 'D',
    userStatus: 'NON_CERTIFIED',
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await getData(
  //         GET_CURRENT_INFO,
  //         {
  //           Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
  //         },
  //         {},
  //       );

  //       if (response) {
  //         console.log(response.data.result);
  //         setUserInfo(response.data.result);
  //         setSchoolName(response.data.result.dispatchedUniversity);
  //         setLink(response.data.result.universityUrl);
  //         setNickname(response.data.result.nickname);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    setNickname(userInfo.nickname);
  }, []);

  const putEditedNickname = async (nicknameInput) => {
    try {
      setIsLoading(true);
      const response = await putData(PUT_NICKNAME, nicknameInput, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 수정 버튼 클릭 시 동작
  const clickEditNickname = () => {
    if (editNickname) {
      // 수정 완료 시에 새로운 닉네임을 저장 (닉네임 변경 로직 추가 가능)
      putEditedNickname(nicknameInput);
    } else {
      console.log('닉네임 수정 중');
    }
    // 수정 모드 토글
    setEditNickname(!editNickname);
  };

  // useEffect(() => {
  //   console.log('수정 상태', editNickname);
  // }, []);

  //   //수정하기
  // const clickEditSchoolName = () => {
  //   setEditSchoolName(!editSchoolName);
  //   if (!editSchoolName) {
  //     //수정중이 아닐 때
  //     setSchoolName(originalSchoolName);
  //   }
  // };

  // const clickEditLink = () => {
  //   setEditLink(!editLink);
  //   if (!editLink) {
  //     setLink(originalLink);
  //   }
  // };
  // //입력에 따라 인풋 길이 바꾸기
  // useEffect(() => {
  //   if (spanRef.current) {
  //     setInputWidth(`${spanRef.current.offsetWidth}px`);
  //   }
  // }, [schoolName]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <s.MyPageLayout>
      <PageHeader pageName="마이페이지" />
      <NavLink
        to="/mypage/mypost"
        style={{ width: '100%' }}
      >
        <s.MyPosts>
          <span>내 글 보기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="20"
            viewBox="0 0 6 11"
            fill="none"
          >
            <path
              d="M1 9.57153L5.1142 6.04508C5.57981 5.64598 5.57981 4.92566 5.1142 4.52656L1 1.00011"
              stroke="black"
              strokeLinecap="round"
            />
          </svg>
        </s.MyPosts>
      </NavLink>

      <s.MyInfoTitle>나의 정보 확인</s.MyInfoTitle>
      <s.MyInfoWrapper>
        <form
          method="put"
          name="info"
        >
          <s.InfoContainer>
            <s.Title>파견교 정보를 수정하세요!</s.Title>
            <s.EditBtn
              onClick={() => navigate('./schoolAuth')}
              color={theme.lightGray}
            >
              수정
            </s.EditBtn>
          </s.InfoContainer>
          <s.InfoContainer>
            {/* -------------------------- 파견교 ----------더미데이터 바꾸기---------------- */}
            <s.Title>나의 파견교</s.Title>
            <s.InfoBox>
              {userTest.userStatus === 'ACTIVE' ? (
                <span>{userInfo.dispatchedUniversity}</span>
              ) : userTest.userStatus === 'AWAIT' ? (
                <>
                  <span>{userInfo.dispatchedUniversity}</span>
                  <s.VerifyButton>인증 대기중</s.VerifyButton>
                </>
              ) : userTest.userStatus === 'NON_CERTIFIED' ? (
                <>
                  <span>{userInfo.dispatchedUniversity}</span>
                  <s.VerifyButton>미인증</s.VerifyButton>
                </>
              ) : (
                //등록 안 된 상태
                <></>
              )}
            </s.InfoBox>
          </s.InfoContainer>
          {/* -------------------------- 파견교 홈페이지 링크 -------------------------- */}
          <s.InfoContainer>
            <s.Title>파견교 홈페이지 링크</s.Title>

            <s.TextInput
              disabled={!editLink}
              value={
                link && link.length > 0
                  ? { link }
                  : '파견교 홈페이지 링크를 등록하세요'
              }
              placeholder={link}
            />
          </s.InfoContainer>
          {/* -------------------------- 파견교 국가 -------------------------- */}
          <div style={{ display: 'flex', margin: '2rem 0' }}>
            <s.Title>파견교 소재 국가</s.Title>
            <s.Country>
              {userInfo?.country ? userInfo.country : '없음'}
            </s.Country>
          </div>

          <s.InfoContainer>
            <s.Title>Email</s.Title>
            <s.InfoBox>
              <span>{userInfo?.email ? userInfo.email : '없음'}</span>
            </s.InfoBox>
          </s.InfoContainer>

          <s.InfoContainer>
            <s.Title>이름</s.Title>
            <s.InfoBox>
              <span>{userInfo?.name ? userInfo.name : '없음'}</span>
            </s.InfoBox>
          </s.InfoContainer>

          <s.InfoContainer>
            <s.Title>전화번호</s.Title>
            <s.InfoBox>
              <span>{userInfo?.phone ? userInfo.phone : '없음'}</span>
            </s.InfoBox>
          </s.InfoContainer>

          <s.InfoContainer style={{ paddingBottom: '2rem' }}>
            <s.Title>닉네임</s.Title>
            <s.EditBtn
              color={theme.lightGray}
              onClick={() => clickEditNickname()}
            >
              {editNickname ? <span>수정 완료</span> : <span>수정</span>}
            </s.EditBtn>
            <s.TextInput
              disabled={!editNickname} // 수정 모드일 때만 활성화
              value={editNickname ? nicknameInput : nickname} // 닉네임 입력 상태를 바인딩
              onChange={(e) => setNicknameInput(e.target.value)} // 닉네임 입력 변화 처리
              placeholder="닉네임을 입력하세요"
            />
          </s.InfoContainer>
        </form>
      </s.MyInfoWrapper>
    </s.MyPageLayout>
  );
};

export default MyPage;
