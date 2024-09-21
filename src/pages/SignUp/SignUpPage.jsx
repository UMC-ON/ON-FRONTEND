import useMultiStepForm from '../../hooks/useMultiStepForm';
import * as s from './SignUpStyled';
import * as FormElement from './FormElements';
import groupLogo from '../../assets/images/groupLogo.svg';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../api/Functions';
import { SIGN_UP_URL } from '../../api/urls';

const userInfoBE = {
  loginId: '',
  password: '',
  nickname: '',
  name: '',
  age: '',
  gender: '',
  phone: '',
};

const SignUpPage = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState(userInfoBE);
  const [dupCheck, setDupCheck] = useState({ loginId: 0, nickname: 0 });
  //0==유효성검사도, 중복검사도 진행X
  //1== 유효성,중복검사 OK
  const [isActive, setActive] = useState(false);
  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
      if (name === 'nickname' || name === 'loginId') {
        //이메일이나 닉네임이 바뀔 경우 중복체크 역사 초기화
        setDupCheck({ ...dupCheck, [name]: 0 });
      }
    }
  };
  const { currentTitle, currentStep, prev, next, isFirstStep, isLastStep } =
    useMultiStepForm([
      {
        title: '회원 가입을 위한 약관 동의',
        element: <FormElement.TermForm setActive={setActive} />,
      },

      {
        title: '정보 입력',
        element: (
          <FormElement.UserInfoForm1
            state={userInfo}
            updateUserInfo={updateUserInfo}
            setActive={setActive}
            setDupCheck={(a) => {
              setDupCheck(a);
            }}
            dupCheck={dupCheck}
          />
        ),
      },
      {
        title: '정보 입력',
        element: (
          <FormElement.UserInfoForm2
            state={userInfo}
            updateUserInfo={updateUserInfo}
            setActive={setActive}
            setDupCheck={setDupCheck}
            dupCheck={dupCheck}
          />
        ),
      },
    ]);
  const animationDiv = useRef(null);

  const handleSubmitBE = async (e) => {
    e.preventDefault();

    if (isLastStep) {
      console.log('제출');
      // TODO: Request form
      //UserList.unshift(userInfo);
      const formData = JSON.stringify(userInfo);
      const response = await postData(SIGN_UP_URL, formData);
      if (response) {
        alert('Submitted!');
        nav('/signUp/complete');
      } else {
        alert('처리하는 중 오류가 생겼습니다. 처음부터 다시 시도해주세요.');
      }

      return false;
    }

    next(userInfo);
  };
  return (
    <div>
      <form onSubmit={handleSubmitBE}>
        <s.FormPage>
          <s.SectionWrapper>
            <s.TitleSection>
              <s.Logo src={groupLogo} />
              <img />
              <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
            </s.TitleSection>

            <s.ContentSection ref={animationDiv}>
              {!isFirstStep && (
                <s.BackButton
                  type="button"
                  onClick={prev}
                >
                  이전 단계
                </s.BackButton>
              )}
              <s.StyledH2 style={{ marginBottom: '40px' }}>
                {currentTitle}
              </s.StyledH2>
              {currentStep}
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.TwoColumnWrapper>
              {currentTitle === '파견교 인증' ? (
                <s.PurpleButton style={{ backgroundColor: ' #d7dff4' }}>
                  건너뛰기
                </s.PurpleButton>
              ) : null}
              <s.PurpleButton disabled={!isActive}>
                {isLastStep ? '회원 가입하기' : '다음 단계'}
              </s.PurpleButton>
            </s.TwoColumnWrapper>
          </s.ButtonSection>
        </s.FormPage>
      </form>
    </div>
  );
};

export default SignUpPage;
