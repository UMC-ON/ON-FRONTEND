import styled from 'styled-components';
import { getToken, getMessaging } from 'firebase/messaging';
import EditButton from '../../assets/images/mypage_edit_button.svg';
import { useState } from 'react';
//import { DELETE_ACCOUNT } from '../../api/urls';
import { postData } from '../../api/Functions';
import DeleteAccountModal from './DeleteAccountModal';
import { useEffect } from 'react';
import theme from '../../styles/theme';
import { putData } from '../../api/Functions';
import {
  PUT_NICKNAME,
  PUT_UNIV,
  CHECK_DUPLICATE_NICK,
  POST_TOKEN,
} from '../../api/urls';
import validImg from '../../assets/images/validNickName.svg';
import { handleAllowNotification } from '../../service/notificationPermission';
import { app } from '../../service/initFirebase';
const MyInfo = ({
  loginId,
  name,
  phone,
  link,
  nickname,
  setNickname,
  setIsLoading,
  setLink,
  userStatus,
}) => {
  const [editLink, setEditLink] = useState(false);
  const [linkInput, setLinkInput] = useState(link);

  const [editNickname, setEditNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(nickname);

  const [modalDisplay, setModalDisplay] = useState(false); // 모달 상태 관리
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [isPushAllowed, setIsPushAllowed] = useState(false);

  const handlePushCondition = () => {
    if ('Notification' in window) {
      const permission = Notification.permission;

      if (permission === 'granted') {
        setIsPushAllowed(true);
      } else if (permission === 'denied') {
        setIsPushAllowed(false);
      } else {
        setIsPushAllowed(false);
      }
    } else {
      alert('이 브라우저에서는 알림 기능을 지원하지 않습니다. ');
    }
  };

  useEffect(() => {
    handlePushCondition();
  }, []);

  const handleToggleChange = () => {
    if (isPushAllowed) {
      return;
    } else {
      handleAllowNotification();
      handlePushCondition();
    }
  };

  const handleDeviceToken = async () => {
    if (!isPushAllowed) {
      alert('푸시 허용을 해주세요.');
      handlePushCondition();
    } else if (isPushAllowed) {
      const messaging = getMessaging(app);
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      if (token) {
        try {
          const response = await postData(
            POST_TOKEN,
            {
              deviceToken: token,
            },
            {
              Authorization: `Bearer ${localStorage.getItem('AToken')}`,
              'Content-Type': 'application/json',
            },
          );

          if (response.status == 200) {
            // console.log('토큰 보내짐:', response.data);
            alert(
              '성공적으로 등록되었습니다. 알림 서비스를 원활히 이용하실 수 있습니다.',
            );
          }
        } catch (error) {
          // console.error('토큰 보내는 중 에러 발생', error);
        }
      } else {
        alert('토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요');
      }
    }
  };

  function formatPhoneNumber(phoneNumber) {
    // 전화번호 문자열이 11자리일 경우에만 포맷팅 진행
    if (phoneNumber.length === 11 && /^010\d{8}$/.test(phoneNumber)) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return phoneNumber;
    }
  }

  //닉네임 중복 체크
  useEffect(() => {
    setDuplicateCheck(false);
  }, [nicknameInput]);
  const handleNicknameDuplicateCheck = (data) => {
    if (nickname === data) {
      alert('동일한 닉네임 입니다.');
      setEditNickname(false);
    } else {
      const response = postData(CHECK_DUPLICATE_NICK, data, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        'Content-Type': 'text/plains',
      });
      response
        .then((res) => {
          if (res.data === true) {
            setDuplicateCheck(false);
            alert('이미 존재하는 닉네임입니다.');
          } else if (res.data === false) {
            alert('사용할 수 있는 닉네임입니다.');
            setDuplicateCheck(true);
          }
        })
        .catch((error) => {
          alert('닉네임 중복 확인 오류.');
        });
    }
  };

  //닉네임 바꾸기 api
  const handleEditedNickname = async (data) => {
    try {
      if (duplicateCheck == false) {
        alert('닉네임 중복 확인을 해주세요.');
      } else {
        setIsLoading(true);
        const response = await putData(PUT_NICKNAME, data, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          'Content-Type': 'text/plains',
        });
        if (response.status == 200) {
          setNickname(data);
        }
        setEditNickname(false);
      }
    } catch (error) {
      alert('닉네임 수정 오류.');
    } finally {
      setIsLoading(false);
    }
  };

  //링크 바꾸기
  const handleEditedLink = async (data) => {
    try {
      if (data === link) {
        alert('동일한 링크입니다.');
      } else {
        setIsLoading(true);
        // 단순 문자열로 요청
        const response = await putData(PUT_UNIV, data, {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
          'Content-Type': 'text/plain', // 헤더 명시
        });
        if (response.status === 200) {
          setLink(data);
        }
      }
    } catch (error) {
      alert('링크 수정 오류. 올바른 주소 형식인가요?');
    } finally {
      setIsLoading(false);
      setEditLink(false);
    }
  };

  return (
    <MyInfoContainer>
      <Wrapper>
        <TitleBox>이메일</TitleBox>
        <InfoBox>{loginId}</InfoBox>
      </Wrapper>
      <Wrapper>
        <TitleBox>이름</TitleBox>
        <InfoBox>{name}</InfoBox>
      </Wrapper>
      <Wrapper>
        <TitleBox>전화번호</TitleBox>
        <InfoBox>{formatPhoneNumber(phone)}</InfoBox>
      </Wrapper>
      <Wrapper>
        <TitleBox>
          파견교 홈페이지 링크
          {userStatus !== 'TEMPORARY' &&
            (!editLink ? (
              <img
                src={EditButton}
                onClick={() => setEditLink(true)}
              />
            ) : (
              <PurpleBox
                onClick={() => handleEditedLink(linkInput)}
                $dup={true}
              >
                수정 완료
              </PurpleBox>
            ))}
        </TitleBox>
        {!editLink ? (
          <TextInput
            value={link ? link : ''}
            disabled={true}
          />
        ) : (
          <TextInput
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
          />
        )}
      </Wrapper>
      <Wrapper>
        <TitleBox>
          닉네임
          {userStatus !== 'TEMPORARY' &&
            (!editNickname ? (
              <img
                src={EditButton}
                onClick={() => setEditNickname(true)}
              />
            ) : (
              <PurpleBox
                onClick={() => handleEditedNickname(nicknameInput)}
                $dup={duplicateCheck}
              >
                수정 완료
              </PurpleBox>
            ))}
        </TitleBox>

        {!editNickname ? (
          <TextInput
            value={nickname}
            disabled={true}
          />
        ) : (
          <InputWrapper>
            <TextInput
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
            {duplicateCheck ? (
              <img src={validImg} />
            ) : (
              <DuplicateBtn
                onClick={() => handleNicknameDuplicateCheck(nicknameInput)}
              >
                중복체크
              </DuplicateBtn>
            )}
          </InputWrapper>
        )}
      </Wrapper>

      <PushWrapper>
        <TitleBox>
          알림 수신 동의
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isPushAllowed}
              onChange={() => handleToggleChange()}
            />
            <span>{isPushAllowed ? '동의' : '미동의'}</span>
          </ToggleSwitch>
        </TitleBox>
        <PushInfo>
          <div>!</div>
          알림이 수신되지 않나요?{' '}
          <span onClick={() => handleDeviceToken()}>여기를 눌러</span>
          &nbsp;디바이스를 다시 등록하세요.
        </PushInfo>
      </PushWrapper>

      <Wrapper style={{ display: 'inline-block', textAlign: 'left' }}>
        <DeleteAccount onClick={() => setModalDisplay(true)}>
          탈퇴
        </DeleteAccount>
      </Wrapper>
      {/* 모달 표시 */}
      {modalDisplay && (
        <DeleteAccountModal
          modalDisplay={modalDisplay}
          onClose={() => setModalDisplay(false)}
          setIsLoading={setIsLoading}
        />
      )}
    </MyInfoContainer>
  );
};

export default MyInfo;

const MyInfoContainer = styled.article`
  margin: 1.1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;
const PushInfo = styled.div`
  display: block;
  align-items: center;
  color: #a8a8a8;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  div {
    display: inline-flex;
    background-color: #a8a8a8;
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
  }
  span {
    text-decoration: underline;
  }
`;

const PushWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  text-align: left;
  color: #000;
  font-family: Inter;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 450;
  line-height: normal;
  img,
  div {
    margin-left: 0.4rem;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid #b0b0b0;
  color: #5c5c5c;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

const TextInput = styled.input`
  width: 100%;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid #b0b0b0;
  background: none;
  color: #5c5c5c;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  ::placeholder {
    color: #5c5c5c;
    font-family: Inter;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const DeleteAccount = styled.span`
  color: #a3a3a3;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-align: left;
  display: inline-block;
  margin-top: 10px;
`;

const PurpleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.8rem;
  padding: 0.2rem 0.4rem;
  background: ${(props) => (props.$dup ? theme.purpleGra : theme.creamGray)};
  color: #fff;
  font-family: Inter;
  font-size: 13px;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  img {
    position: absolute;
    right: 0;
    top: 0;
    height: 1.2rem;
  }
`;

const DuplicateBtn = styled(PurpleBox)`
  position: absolute;
  background: ${theme.purpleGra};
  right: 0;
  top: 0;
  padding: 0.27rem 0.4rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 3.8rem;
  height: 1.5rem;
  margin-left: auto;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 1.5rem;
    transition: 0.4s;
    color: #5c5c5c;
    font-size: 11px;
    line-height: 1.5rem;
    padding: 0 0.4rem 0 0.8rem;
  }

  span::before {
    position: absolute;
    content: '';
    font-size: 11px;
    height: 1.2rem;
    width: 1.2rem;
    left: 0.2rem; /* 슬라이더 초기 위치 */
    bottom: 0.15rem;
    background-color: white; /* 슬라이더 색상 */
    border-radius: 50%; /* 원형 버튼 */
    transition: 0.4s;
    color: black;
    box-shadow: 0px 0px 10px -5px;
  }

  input:checked + span {
    background: ${theme.blueGra};
    text-align: left;
  }

  input:not(:checked) + span {
    text-align: right;
  }
  input:checked + span::before {
    transform: translateX(2.3rem);
  }
`;
