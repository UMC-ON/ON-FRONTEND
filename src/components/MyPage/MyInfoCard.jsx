import styled from 'styled-components';
import theme from '../../styles/theme';
import check from '../../assets/images/mypage_check.svg';
import EditButton from '../../assets/images/mypage_edit_button.svg';
import { useNavigate } from 'react-router-dom';

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
        <Flag></Flag>
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
  border-radius: 50%;
  border: 1px solid #d9d9d9;
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
  div {
    width: 1px;
    background-color: #a3a3a3;
    transform: scaleX(0.8);
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
