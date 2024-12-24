import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/NewLogo.svg';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CHECK_VERIFYCODE_PW, SEND_PW_AUTHNUM } from '../../api/urls';
import { postData, putData } from '../../api/Functions';

const FindPassword = () => {
  const nav = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });
  const [userInfo, setUserInfo] = useState({
    loginId: '',
    name: '',
    phone: '',
    gender: '',
  });

  const [authForm, setAuthForm] = useState({
    loginId: '',
    authNum: 0,
  });

  const updateAuthForm = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setAuthForm({ ...userInfo, [name]: value });
    }
  };

  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
      //console.log(userInfo);
    }
  };

  const sendVerificationCode = async (userInfo) => {
    const formData = JSON.stringify(userInfo);

    const res = await postData(SEND_PW_AUTHNUM, formData).then((res) => {
      //console.log(res);

      alert('인증번호가 메일로 발송되었습니다.');
      //setModal(true);
      return res;
    });
    return res;
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
              <s.StyledH2>비밀번호 찾기</s.StyledH2>
              <s.TwoColumnWrapper>
                <div>
                  <s.InputWrapper>
                    <s.Div>이름</s.Div>
                    <s.TransparentInput
                      placeholder="본명으로 작성"
                      name="name"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      {...register('name', {
                        required: '이름은 필수입니다.',
                        onChange: (e) => {
                          updateUserInfo(e);
                        },
                        pattern: {
                          value: /^[가-힣]+$/,
                          message: '올바른 형식으로 입력해주세요.',
                        },
                      })}
                    />
                  </s.InputWrapper>
                  <s.Explanation role="alert">
                    {errors.name && errors.name.message}
                  </s.Explanation>
                </div>
                <s.InputWrapper style={{ border: 'none' }}>
                  <s.Div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    성별
                  </s.Div>
                  <s.StyledComboBox
                    name="gender"
                    pattern="[0-9]"
                    aria-invalid={errors.gender ? 'true' : 'false'}
                    {...register('gender', {
                      required: '성별은 필수입니다.',
                      onChange: (e) => {
                        updateUserInfo(e);
                      },
                    })}
                  >
                    <option
                      value=""
                      hidden
                    >
                      성별을 선택해 주세요.
                    </option>
                    <option
                      value="MALE"
                      style={{ background: 'white'}}
                    >
                      남자
                    </option>
                    <option
                      value="FEMALE"
                      style={{ background: 'white' }}
                    >
                      여자
                    </option>
                  </s.StyledComboBox>
                </s.InputWrapper>
              </s.TwoColumnWrapper>
              <s.InputWrapper>
                <s.Div>전화번호</s.Div>
                <s.TransparentInput
                  type="tel"
                  placeholder="'-' 없이 숫자만 입력해주세요"
                  inputMode="numeric"
                  pattern="\d*"
                  name="phone"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  {...register('phone', {
                    required: '전화번호는 필수입니다.',
                    pattern: {
                      value: /^[0-9]*$/,
                      message: '숫자로만 적어주세요.',
                    },
                    onChange: (e) => {
                      updateUserInfo(e);
                    },
                  })}
                />
              </s.InputWrapper>
              <s.Explanation role="alert">
                {errors.phone && errors.phone.message}
              </s.Explanation>
              <s.InputWrapper>
                <s.Div>이메일</s.Div>
                <SpaceBetweenContainer>
                  <s.TransparentInput
                    type="text"
                    name="loginId"
                    placeholder="가입하신 이메일을 적어주세요"
                    aria-invalid={errors.loginId ? 'true' : 'false'}
                    {...register('loginId', {
                      required: '이메일을 입력해주세요.',
                      onChange: (e) => {
                        updateUserInfo(e);
                        updateAuthForm(e);
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                        message: '이메일 형식에 맞게 입력해주세요.',
                      },
                    })}
                  />
                  <s.GrayButton
                    onClick={() => {
                      sendVerificationCode(userInfo);
                    }}
                  >
                    인증번호 받기
                  </s.GrayButton>
                </SpaceBetweenContainer>
              </s.InputWrapper>

              <s.Explanation role="alert">
                {errors.loginId && errors.loginId.message}
              </s.Explanation>
              <s.InputWrapper>
                <s.Div>인증 코드</s.Div>
                <SpaceBetweenContainer>
                  <s.TransparentInput
                    type="text"
                    name="authNum"
                    aria-invalid={errors.authNum ? 'true' : 'false'}
                    {...register('authNum', {
                      onChange: (e) => {
                        updateAuthForm(e);
                      },
                      required: '인증번호를 입력해주세요.',
                    })}
                  />
                  <s.GrayButton
                    onClick={async (e) => {
                      e.preventDefault();
                      const formData = JSON.stringify(authForm);
                      //console.log('F.formData:', formData);
                      try {
                        const res = await putData(
                          CHECK_VERIFYCODE_PW,
                          formData,
                        );
                        if (res) {
                          if (res.data == false) {
                            alert('인증번호가 일치하지 않습니다.');
                          } else {
                            nav('/changePassword', {
                              state: {
                                value: {
                                  loginId: userInfo.loginId,
                                  authNum: authForm.authNum,
                                },
                              },
                            });
                          }
                        }
                      } catch (error) {
                        //console.log(error);
                        if (error.response?.status == Number(401)) {
                          alert(
                            '인증번호가 만료되었습니다. 인증번호를 다시 요청해주세요.',
                          );
                        }
                      }
                    }}
                  >
                    인증 확인
                  </s.GrayButton>
                </SpaceBetweenContainer>
              </s.InputWrapper>
            </s.ContentSection>
          </s.SectionWrapper>
        </s.FormPage>
      </form>
    </>
  );
};

export default FindPassword;

const SpaceBetweenContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
