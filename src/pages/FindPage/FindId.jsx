import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const FindId = () => {
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  const [userInfo, setUserInfo] = useState('');

  const updateUserInfo = (e) => {};

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
              <s.StyledH2>아이디 찾기</s.StyledH2>

              <s.InputWrapper>
                <s.Div>이름</s.Div>
                <s.TransparentInput
                  placeholder="본명으로 작성해 주세요"
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
              <s.Explanation>
                {errors.name && (
                  <small role="alert">{errors.name.message}</small>
                )}
              </s.Explanation>
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
                      setUserInfo(e.target.value);
                    },
                  })}
                />
              </s.InputWrapper>
              <s.Explanation>
                {errors.phone && (
                  <small role="alert">{errors.phone.message}</small>
                )}
              </s.Explanation>
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
                  style={{ width: '50%' }}
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
                  ></option>
                  <option
                    value="MALE"
                    style={{ background: 'white' }}
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
            </s.ContentSection>
          </s.SectionWrapper>
        </s.FormPage>
      </form>
    </>
  );
};

export default FindId;
