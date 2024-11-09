import styled from 'styled-components';
import EditButton from '../../assets/images/mypage_edit_button.svg';
import { useState, useRef, useEffect } from 'react';

const MyInfo = ({ loginId, name, phone, universityUrl, userNickname }) => {
  const [editLink, setEditLink] = useState(false);
  const [inputLink, setInputLink] = useState('');
  const [originalLink, setOriginalLink] = useState(universityUrl);

  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState(userNickname);
  const [nicknameInput, setNicknameInput] = useState('');

  function formatPhoneNumber(phoneNumber) {
    // 전화번호 문자열이 11자리일 경우에만 포맷팅 진행
    if (phoneNumber.length === 11 && /^010\d{8}$/.test(phoneNumber)) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return phoneNumber;
    }
  }
  return (
    <MyInfoContainer>
      <Wrapper>
        <TitleBox>아이디</TitleBox>
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
          {!editLink ? (
            <img
              src={EditButton}
              onClick={() => setEditLink(true)}
            />
          ) : (
            <div onClick={() => setEditLink(false)}>수정 완료</div>
          )}
        </TitleBox>
        <TextInput
          disabled={!editLink}
          value={editLink ? inputLink : originalLink}
          onChange={(e) => setInputLink(e.target.value)}
        />
      </Wrapper>
      <Wrapper>
        <TitleBox>
          닉네임
          <img src={EditButton} />
        </TitleBox>
        <TextInput value={nickname} />
      </Wrapper>
    </MyInfoContainer>
  );
};

export default MyInfo;

const MyInfoContainer = styled.article`
  margin-top: 1.1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
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
  font-weight: 400;
  line-height: normal;
  img {
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
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

const TextInput = styled.input`
  width: 100%;
  height: 1.5rem;
  border: none;
  border-bottom: solid #b0b0b0 1px;
  background: none;
  color: #838383;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  ::placeholder {
    color: #838383;
    font-family: Inter;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
