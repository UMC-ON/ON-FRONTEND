import styled from 'styled-components';
import * as s from './SignUpStyled';
import { useForm } from 'react-hook-form';

const Forms = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <s.InputWrapper>
          <div>아이디</div>
          <SpaceBetweenContainer>
            <s.TransparentInput
              type="text"
              name="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                  message: '이메일 형식에 맞게 입력해주세요.',
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </SpaceBetweenContainer>
          <div>비밀번호</div>
          <SpaceBetweenContainer>
            <s.TransparentInput
              type="password"
              name="password"
              placeholder="특수문자와 영문, 숫자를 혼합하여 8-12자리"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!^%*#?&])[A-Za-z\d@$!^%*#?&]{8,}$/,
                  message: '특수문자와 영문, 숫자의 조합으로 입력해주세요.',
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
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </SpaceBetweenContainer>
          <div>비밀번호 확인</div>
          <SpaceBetweenContainer>
            <s.TransparentInput
              type="password"
              name="password_check"
            />
          </SpaceBetweenContainer>
        </s.InputWrapper>
        <button
          type="submit"
          disabled={isSubmitting}
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default Forms;

const SpaceBetweenContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
