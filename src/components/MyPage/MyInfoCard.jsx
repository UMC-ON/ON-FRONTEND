import styled from 'styled-components';
import theme from '../../styles/theme';
import check from '../../assets/images/mypage_check.svg';
import EditButton from '../../assets/images/mypage_edit_button.svg';
import { useNavigate } from 'react-router-dom';
import { ChatCountryIcon } from '../CountryIcon';

const MyInfoCard = ({
  nickname,
  country,
  university,
  dispatchType,
  userStatus,
  isPassword,
}) => {
  const navigate = useNavigate();
  return (
    <InfoCardWrapper>
      <InfoCardContainer>
        <Nickname>
          <span>{nickname}</span>
          {userStatus === 'ACTIVE' ? <img src={check} /> : <></>}
        </Nickname>

        <Flag>
          <ChatCountryIcon country={country} />
        </Flag>
        {userStatus === 'ACTIVE' ? (
          <>
            <University>{university}</University>
            <SpecificInfo>
              <span>{country}</span>
              <div />
              <span>
                {dispatchType === 'DISPATCHED'
                  ? `교환학생`
                  : dispatchType === 'NOT_DISPATCHED'
                    ? `방문학생`
                    : ''}
              </span>
              {isPassword ? (
                <img
                  src={EditButton}
                  onClick={() => navigate('./schoolAuth')}
                />
              ) : (
                <></>
              )}
            </SpecificInfo>
          </>
        ) : userStatus === 'NOT_CERTIFY' ? (
          <>
            <University>학교가 인증되지 않았어요.</University>
            <PurpleBox onClick={() => navigate('./schoolAuth')}>
              파견교 등록 및 인증
            </PurpleBox>
          </>
        ) : userStatus === 'AWAIT' ? (
          <>
            <University>{university}</University>
            <PurpleBox>인증 대기중</PurpleBox>
          </>
        ) : null}
      </InfoCardContainer>
    </InfoCardWrapper>
  );
};

export default MyInfoCard;

const InfoCardWrapper = styled.article`
  margin-top: 1.1rem;
  width: 100%;
  height: 133px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 12px;
  background: linear-gradient(#f3f9ff, #f3f9ff), ${theme.blueGra};
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  justify-content: center;
`;

const InfoCardContainer = styled.div`
  padding: 21px 27px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  justify-items: start;
  grid-column-gap: 8px;
`;

const Nickname = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  span {
    color: #5c5c5c;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 글씨가 잘리면 "..." 표시 */
  }
`;
const Flag = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
`;

const University = styled.span`
  grid-column: 1/3;
  grid-row: 2/3;
  color: #5c5c5c;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SpecificInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37rem;
  grid-column: 1/3;
  grid-row: 3/4;
  div {
    width: 1px;
    background-color: #a3a3a3;
    transform: scaleX(0.5);
    height: 15px;
  }
  span {
    color: #a3a3a3;
    text-align: right;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
  }
`;

const PurpleBox = styled.div`
  height: 1.375rem;
  grid-column: 1/3;
  grid-row: 3/4;
  padding: 0 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${theme.purpleGra};
  color: #fff;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 500;
`;
