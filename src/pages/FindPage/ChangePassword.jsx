import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/NewLogo.svg';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import validImg from '../../assets/images/validNickName.svg';
import { postData, putData } from '../../api/Functions';
import { CHANGE_PW } from '../../api/urls';
import Modal from '../../components/Modal/Modal';

const ChangePassword = () => {
  const nav = useNavigate();
  const { loginId, authNum } = useLocation().state.value;
  const {
    register,
    formState: { errors, isValid },
    watch,
    clearErrors,
    setError,
  } = useForm({ mode: 'onChange' });

  const [userInfo, setUserInfo] = useState({
    loginId: loginId,
    authNum: authNum,
    password: '',
  });
  const [modal, setModal] = useState(false);

  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
      console.log(userInfo);
    }
  };

  const passwordSet = useRef({ pw: '', pw_check: '' });

  const changePW = async (userInfo) => {
    const formData = JSON.stringify(userInfo);
    await putData(CHANGE_PW, formData).then((res) => {
      console.log(res);
      setModal(true);
    });
  };

  return (
    <>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <s.FormPage>
          <s.SectionWrapper>
            <s.TitleSection>
              <s.Logo src={groupLogo} />
              <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
            </s.TitleSection>
            <s.ContentSection>
              <s.BackButton
                onClick={() => {
                  nav(-1);
                }}
              >
                이전으로
              </s.BackButton>
              <s.StyledH2>비밀번호 변경</s.StyledH2>
              <s.InputWrapper>
                <s.Div>새 비밀번호</s.Div>
                <SpaceBetweenContainer>
                  <s.TransparentInput
                    type="password"
                    name="password"
                    aria-invalid={errors.password ? 'true' : 'false'}
                    {...register('password', {
                      onChange: (e) => {
                        updateUserInfo(e);
                        passwordSet.current.pw = e.target.value;
                        if (
                          passwordSet.current.pw != passwordSet.current.pw_check
                        ) {
                          setError('password_check', {
                            message: '비밀번호가 일치하지 않습니다.',
                          });
                        } else {
                          clearErrors('password_check');
                        }
                      },
                      required: '비밀번호를 입력해주세요.',
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!^%*#?&])[A-Za-z\d@$!^%*#?&]{8,}$/,
                        message:
                          '특수문자와 영문, 숫자의 조합으로 입력해주세요.',
                      },
                      minLength: {
                        value: 8,
                        message: '8자리 이상으로 작성해주세요.',
                      },
                      maxLength: {
                        value: 12,
                        message: '12자리 이하로 작성해주세요.',
                      },
                    })}
                  />
                  {passwordSet.current.pw && !errors.password && (
                    <img src={validImg} />
                  )}
                </SpaceBetweenContainer>
              </s.InputWrapper>
              <s.Explanation>
                {errors.password && (
                  <small role="alert">{errors.password.message}</small>
                )}
              </s.Explanation>
              <s.InputWrapper>
                <s.Div>비밀번호 확인</s.Div>
                <SpaceBetweenContainer>
                  <s.TransparentInput
                    type="password"
                    name="password_check"
                    aria-invalid={errors.password_check ? 'true' : 'false'}
                    {...register('password_check', {
                      required: '비밀번호를 확인해주세요.',
                      validate: (value) => {
                        console.log(value == passwordSet.current.pw);
                        return value == passwordSet.current.pw
                          ? true
                          : '비밀번호가 일치하지 않습니다';
                      },
                      onChange: (e) => {
                        passwordSet.current.pw_check = e.target.value;
                        if (
                          passwordSet.current.pw_check !==
                          passwordSet.current.pw
                        ) {
                          setError('password_check', {
                            message: '비밀번호가 일치하지 않습니다.',
                          });
                        }
                      },
                    })}
                  />
                  {watch('password_check') && !errors.password_check && (
                    <img src={validImg} />
                  )}
                </SpaceBetweenContainer>
              </s.InputWrapper>
              <s.Explanation>
                {errors.password_check && (
                  <small role="alert">{errors.password_check.message}</small>
                )}
              </s.Explanation>
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.PurpleButton
              disabled={!isValid}
              onClick={() => {
                changePW(userInfo);
              }}
            >
              비밀번호 변경
            </s.PurpleButton>
          </s.ButtonSection>
        </s.FormPage>
      </form>
      {modal && (
        <Modal
          title={`비밀번호
        변경 완료`}
          content={`회원님의 비밀번호가
        정상적으로 변경되었습니다.`}
          type="BUTTON"
          closeModal={() => {
            setModal(false);
            nav('/signIn');
          }}
          buttonText="로그인하러 가기"
          onBtnClick={() => {
            setModal(false);
            nav('/signIn');
          }}
        />
      )}
    </>
  );
};

export default ChangePassword;

const SpaceBetweenContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
