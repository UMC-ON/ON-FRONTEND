import styled from 'styled-components';
import { useState } from 'react';
import planeImg from '../../assets/images/delete_account_plane_image.svg';
import completePlaneImg from '../../assets/images/delete_account_plane_complete.svg';
import dropDownArrow from '../../assets/images/delete_account_drop_down.svg';
import exit from '../../assets/images/exit.svg';
import theme from '../../styles/theme';
import { DELETE_ACCOUNT } from '../../api/urls';
import { deleteData } from '../../api/Functions';
import { useNavigate } from 'react-router-dom';

const DeleteAccountModal = ({ modalDisplay, onClose }) => {
  const [dropDown, setDropDown] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const navigate = useNavigate();

  const reasons = [
    '유용한 정보가 많이 없어요',
    '잦은 오류와 버그가 발생해요',
    '사용을 잘 안 하게 돼요',
    '삭제하고 싶은 개인정보가 있어요',
    '다른 계정이 있어요',
    '기타',
  ];

  //계정 삭제 api
  const handleDeleteAccount = async () => {
    // setIsLoading(true);
    // try {
    //   const response = await deleteData(
    //     DELETE_ACCOUNT,
    //     {
    //       Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
    //     },
    //     {},
    //   );
    //   console.log(response);
    //   if (response.status == 200) {
    //     localStorage.removeItem('AToken');
    //     localStorage.removeItem('RToken');
    //     localStorage.removeItem('grantType');
    //     dispatch(logout());
    //   }
    // } catch (error) {
    //   console.error('delete account error:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleWrapperClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단, 모달 박스 내부 클릭 시 닫히지 않음
  };

  return (
    <ModalLayout
      display={modalDisplay}
      onClick={onClose}
    >
      <ModalWrapper>
        <ModalBox onClick={handleWrapperClick}>
          {step === 1 && (
            <>
              <ExitButton
                src={exit}
                onClick={onClose}
              />
              <img src={planeImg} />
              <MainText>{`떠나려는\n이유를 알려주세요`}</MainText>
              <DropDownContainer>
                <DropDownMainBox onClick={() => setDropDown(!dropDown)}>
                  <img src={dropDownArrow} />
                  <ReasonText>
                    {selectedReason || '이유를 선택해 주세요'}
                  </ReasonText>
                </DropDownMainBox>
                {dropDown && (
                  <DropDownContentBox>
                    {reasons.map((text, index) => (
                      <DropDownContentText
                        key={index}
                        onClick={() => {
                          setSelectedReason(text);
                          setDropDown(false);
                        }}
                      >
                        {text}
                      </DropDownContentText>
                    ))}
                  </DropDownContentBox>
                )}
              </DropDownContainer>

              <SubText>
                {`조금이라도 불편한 경험을 하셨다면\noncommunity24@gmail.com으로\n전달해 주시면 빠르게 개선할게요.`}
              </SubText>
              {selectedReason && (
                <ButtonSection>
                  <GrayButton onClick={onClose}>취소</GrayButton>
                  <PurpleButton onClick={() => nextStep()}>제출</PurpleButton>
                </ButtonSection>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <ExitButton
                src={exit}
                onClick={onClose}
              />
              <img src={planeImg} />
              <MainText>정말 탈퇴하실 건가요?</MainText>
              <SubText>
                {`탈퇴 시 계정은 삭제되며 
              삭제된 계정은 복구가 불가능합니다. 
              작성된 게시글과 채팅은
              ‘알 수 없음’으로 표시됩니다. 
              또한 탈퇴 후 동일 계정으로의 재가입은 제한될 수 있습니다. 
              
              탈퇴를 진행할까요?`}
              </SubText>
              <ButtonSection>
                <GrayButton onClick={onClose}>취소</GrayButton>
                <PurpleButton
                  onClick={() => nextStep() && handleDeleteAccount()}
                >
                  탈퇴
                </PurpleButton>
              </ButtonSection>
            </>
          )}
          {step === 3 && (
            <>
              <img
                src={completePlaneImg}
                style={{ margin: '1.2rem' }}
              />
              <MainText>탈퇴 처리가 완료됐어요</MainText>
              <SubText>
                {`지금까지 On을 이용해 주셔서 감사합니다.
                On에서 꼭 다시 만나뵙고 싶어요`}
              </SubText>
              <ButtonSection>
                <OkayButton onClick={() => navigate('/landing')}>
                  확인
                </OkayButton>
              </ButtonSection>
            </>
          )}
        </ModalBox>
      </ModalWrapper>
    </ModalLayout>
  );
};

export default DeleteAccountModal;

const ModalLayout = styled.article`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  display: ${({ display }) => (display ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  height: 22rem;
`;
const ModalBox = styled.div`
  position: relative;
  width: 17rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 1px solid #b0b0b0;
  background: #fff;
  box-shadow: 0px 0px 40px 0px rgba(134, 142, 232, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0 1.75rem;
  box-sizing: border-box;
  justify-content: start;
  align-items: center;
`;

const ExitButton = styled.img`
  position: absolute;
  right: 1.125rem;
`;

const MainText = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.025rem;
  white-space: pre-line;
  margin: 0.39rem 0 0.85rem;
`;

const DropDownContainer = styled.div`
  position: relative;
  margin-bottom: 1.19rem;
`;

const DropDownContentBox = styled.div`
  width: 13.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  border: 0.5px solid #ccc;
  background: #fff;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  padding: 0.75rem 1.5rem;
  margin-top: 0.37rem;
  box-sizing: border-box;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const DropDownContentText = styled.span`
  color: #5c5c5c;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.015rem;
`;

const DropDownMainBox = styled.div`
  width: 13.625rem;
  height: 1.75rem;
  flex-shrink: 0;
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  display: flex;
  padding: 0 0.5rem;
  box-sizing: border-box;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

const ReasonText = styled.span`
  width: auto;
  color: #5c5c5c;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.015rem;
`;

const SubText = styled.p`
  color: #363636;
  text-align: center;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.015rem;
  white-space: pre-line;
  max-width: 13.625rem;
  word-break: keep-all;
`;

const ButtonSection = styled.div`
  width: auto;
  gap: 0.5rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
`;

const GrayButton = styled.div`
  display: flex;
  width: 6.25rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: #ccc;
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.02rem;
`;

const PurpleButton = styled.div`
  display: flex;
  width: 6.25rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: ${theme.purpleGra};
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.02rem;
`;

const OkayButton = styled.div`
  display: flex;
  width: 12.9375rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  background: ${theme.purpleGra};
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.02rem;
`;
