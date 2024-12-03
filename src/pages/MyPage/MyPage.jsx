import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import * as s from './MyPageStyled';

import { SIGN_IN_URL, PUT_NICKNAME } from '../../api/urls';
import { postData, putData } from '../../api/Functions';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import MyInfoCard from '../../components/MyPage/MyInfoCard';
import arrow from '../../assets/images/mypage_arrow.svg';
import MyInfo from '../../components/MyPage/MyInfo';

const MyPage = () => {
  const userInfo = useSelector((state) => state.user.user);
  const [error, setError] = useState(null); // 에러를 저장할 상태
  const [isLoading, setIsLoading] = useState(false);

  const [link, setLink] = useState(userInfo.universityUrl);
  const [nickname, setNickname] = useState(userInfo.nickname);

  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const navigate = useNavigate();

  //비밀번호 입력
  const handelPassword = async (passwordInput) => {
    setIsLoading(true);
    try {
      const response = await postData(SIGN_IN_URL, {
        loginId: `${userInfo.loginId}`,
        password: `${passwordInput}`,
      });
      if (response.status == 200) {
        setIsPasswordConfirmed(true);
      }
    } catch (error) {
      //console.error('error:', error);
      alert('다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  //전화번호 포멧팅
  function formatPhoneNumber(phoneNumber) {
    // 전화번호 문자열이 11자리일 경우에만 포맷팅 진행
    if (phoneNumber.length === 11 && /^010\d{8}$/.test(phoneNumber)) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return phoneNumber;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  if (!userInfo) {
    return <>오류</>;
  } else {
    return (
      <>
        <s.MyPageLayout>
          <PageHeader pageName="마이페이지" />

          <MyInfoCard
            nickname={nickname}
            country={userInfo.country ? userInfo.country : ''}
            university={
              userInfo.dispatchedUniversity ? userInfo.dispatchedUniversity : ''
            }
            dispatchType={userInfo.dispatchType ? userInfo.dispatchType : ''}
            userStatus={userInfo.userStatus ? userInfo.userStatus : ''}
            isPassword={isPasswordConfirmed}
            setIsLoading={setIsLoading}
          />
          {userInfo.userStatus !== 'TEMPORARY' ? (
            <NavLink
              to="/mypage/mypost"
              style={{ width: '100%' }}
            >
              <s.MyPosts>
                <span>내 글 보기</span>
                <img src={arrow} />
              </s.MyPosts>
            </NavLink>
          ) : (
            <s.DisabledMyPosts>
              <span>내 글 보기</span>
              <img src={arrow} />
            </s.DisabledMyPosts>
          )}

          <s.MyInfoTitle>내 정보 확인</s.MyInfoTitle>
          {!isPasswordConfirmed ? (
            <s.PasswordContainer>
              <s.PasswordTextInput
                type="password"
                placeholder="개인정보 보호를 위해 비밀번호를 입력해 주세요."
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <s.ConfirmButton onClick={() => handelPassword(passwordInput)}>
                확인
              </s.ConfirmButton>
            </s.PasswordContainer>
          ) : (
            <MyInfo
              loginId={userInfo.loginId ? userInfo.loginId : ''}
              name={userInfo.name ? userInfo.name : ''}
              phone={userInfo.phone ? userInfo.phone : ''}
              link={link}
              setLink={setLink}
              nickname={nickname}
              setIsLoading={setIsLoading}
              setNickname={setNickname}
              userStatus={userInfo.userStatus}
            />
          )}
        </s.MyPageLayout>
      </>
    );
  }
};

export default MyPage;
