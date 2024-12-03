import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/NewLogo.svg';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../api/Functions';
import { FIND_ID } from '../../api/urls';
import Modal from '../../components/Modal/Modal';

const FindId = () => {
  const [modal, setModal] = useState(false);
  const nav = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    gender: '',
  });

  const updateUserInfo = (e) => {
    if (e) {
      let name = e.target.name;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [name]: value });
      //console.log(userInfo);
    }
  };
  const userEmail = useRef('');
  const findId = async (userInfo) => {
    const formData = JSON.stringify(userInfo);

    const res = await postData(FIND_ID, formData).then((res) => {
      const emailFront = res.data.split('@')[0];
      const starredEmail = emailFront.substr(0, emailFront.length - 3) + '***';

      userEmail.current = starredEmail;
      setModal(true);
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
              <s.Explanation role="alert">
                {errors.name && errors.name.message}
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
                      updateUserInfo(e);
                    },
                  })}
                />
              </s.InputWrapper>
              <s.Explanation role="alert">
                {errors.phone && errors.phone.message}
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
                  style={{ width: '50%', fontSize: '0.9rem' }}
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
                    style={{ color: '' }}
                  >
                    성별을 선택해 주세요.
                  </option>
                  <option
                    value="MALE"
                    style={{ background: 'white', fontSize: '1rem' }}
                  >
                    남자
                  </option>
                  <option
                    value="FEMALE"
                    style={{ background: 'white', fontSize: '1rem' }}
                  >
                    여자
                  </option>
                </s.StyledComboBox>
              </s.InputWrapper>
            </s.ContentSection>
          </s.SectionWrapper>
          <s.ButtonSection>
            <s.PurpleButton
              disabled={!isValid}
              onClick={() => {
                findId(userInfo);
              }}
            >
              아이디 찾기
            </s.PurpleButton>
          </s.ButtonSection>
        </s.FormPage>
      </form>
      {modal && (
        <Modal
          closeModal={() => {
            setModal(false);
            nav('/signIn');
          }}
          title={`고객님의 ID는
            ${userEmail.current}
            입니다.`}
          type="BUTTON"
          onBtnClick={() => {
            nav('/signIn');
          }}
          buttonText="확인"
        />
      )}
    </>
  );
};

export default FindId;
