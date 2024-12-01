import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
      console.log(userInfo);
    }
  };
  return (
    <>
      <form
        action="#"
        // onSubmit={handleSubmitBE}
      >
        <s.FormPage>
          <s.SectionWrapper>
            <s.TitleSection>
              <s.Logo src={groupLogo} />
              <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
            </s.TitleSection>
            <s.ContentSection>
              <s.StyledH2>비밀번호 찾기</s.StyledH2>

              <s.InputWrapper>
                <s.Div>이메일</s.Div>
                <s.TransparentInput
                  type="text"
                  name="loginId"
                  placeholder="가입하신 이메일을 적어주세요"
                  aria-invalid={errors.loginId ? 'true' : 'false'}
                  {...register('loginId', {
                    required: '이메일을 입력해주세요.',
                    onChange: (e) => {
                      updateUserInfo(e);
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                      message: '이메일 형식에 맞게 입력해주세요.',
                    },
                  })}
                />
              </s.InputWrapper>
              <s.Explanation>
                {errors.loginId && (
                  <small role="alert">{errors.loginId.message}</small>
                )}
              </s.Explanation>

              <s.InputWrapper>
                아이디
                <s.TransparentInput />
              </s.InputWrapper>
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.PurpleButton>비밀번호 찾기</s.PurpleButton>
          </s.ButtonSection>
        </s.FormPage>
      </form>
    </>
  );
};

export default FindPassword;
