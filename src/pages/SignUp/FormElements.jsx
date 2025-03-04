import * as s from './SignUpStyled';
import styled from 'styled-components';
import validImg from '../../assets/images/validNickName.svg';
import { useRef, useState, useEffect } from 'react';
export const TermForm = ({ setActive }) => {
  return (
    <>
      <TermContent>
        <Text
          size="1.2rem"
          style={{ fontWeight: 'bold', padding: '0.5rem 0' }}
        >
          이용약관 / 개인정보처리방침
        </Text>
        <br />
        <Text size="1.1rem">이용약관</Text>
        <br />
        <Text>제1조(목적)</Text>
        <div>
          On이 제공하는 서비스 및 서비스 이용과 관련하여 On과 이용자 간의 권리,
          의무, 책임 사항 등을 규정함을 목적으로 합니다.
        </div>
        <Text>제2조(서비스의 제공)</Text>
        <pre style={{ whiteSpace: 'pre-line' }}>
          1. On은 다음 서비스를 제공합니다. <br />- 교환/방문학생을 위한 정보
          공유 <Bold>커뮤니티 서비스</Bold>
          <br />- 필요한 물품을 합리적으로 거래 할 수 있는{' '}
          <Bold>물품 거래 기능</Bold>
          <br /> - 교환/방문 생활 중 함께 떠날 동행인을 찾을 수 있는,{' '}
          <Bold>동행 구하기 기능</Bold>
          <br /> - 나만의 소중한 교환/방문 학생의 추억을 남기기 위한{' '}
          <Bold>일기 쓰기 기능</Bold>
          <br />
          2. On은 이메일 계정을 통해 회원가입을 한 이용자에 한해 서비스를
          제공합니다.
          <br /> 또한 교환교 및 방문교(이하 파견교)의 인증을 받아 신뢰도 있는
          커뮤니티 서비스를 제공합니다. 파견교 인증을 하지 않은 이용자는 물품
          거래 기능과 동행 구하기 기능에 글을 쓰거나 신청할 수 없습니다.
          <br /> 3. On은 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를
          변경할 수 있습니다.
          <br /> 4. On은 인터넷 장애 등의 사유로 인해 일시적으로 서비스 제공이
          어려울 경우, 통보 없이 일시적으로 서비스 제공을 중단할 수 있습니다.
          <Text>제3조(서비스 내 이용)</Text>
          <div>
            1. 회원은 언제든지 본인의 계정으로 로그인한 뒤, 마이페이지에서
            본인이 작성한 글을 확인하고 삭제할 수 있습니다. 그 외 문의 창구 등을
            통한 게시글 삭제 요청은 처리되지 않습니다.{' '}
          </div>
          <div>
            2. On 커뮤니티에서 타인의 권리를 존중해 주시기 바랍니다. 무심코
            게재한 게시물로 인해 타인의 저작권이 침해되거나 명예훼손 등 권리
            침해가 발생할 수 있습니다. On은 이에 대한 문제 해결을 위해
            ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’ 등을
            근거로 권리침해 주장자의 요청에 따른 게시물 게시중단, 원 게시자의
            이의신청에 따른 해당 게시물 게시 재개 등을 내용으로 하는 신고하기
            기능을 운영하고 있습니다.
          </div>
          <Text>제4조(주의사항)</Text>
          <div>
            1.회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로
            기재해서는 안 됩니다. 회원 계정에 등록된 정보는 항상 정확한 최신
            정보가 유지될 수 있도록 관리해 주시기 바랍니다. 자신의 계정을 다른
            사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그
            사용을 허락해서는 안 됩니다. 아울러 자신의 계정이 아닌 타인의 계정을
            무단으로 사용해서는 안 됩니다.
          </div>
          <div>
            2.타인에 대해 직접적이고 명백한 신체적 위협을 가하는 내용의 게시물,
            타인의 자해 행위 또는 자살을 부추기거나 권장하는 내용의 게시물,
            타인의 신상정보, 사생활 등 비공개 개인정보를 드러내는 내용의 게시물,
            타인을 지속적으로 따돌리거나 괴롭히는 내용의 게시물, 성매매를 제안,
            알선, 유인 또는 강요하는 내용의 게시물, 공공 안전에 대해 직접적이고
            심각한 위협을 가하는 내용의 게시물은 제한될 수 있습니다.
          </div>
          <div>
            3.관련 법령상 금지되거나 형사처벌의 대상이 되는 행위를 수행하거나
            이를 교사 또는 방조하는 등의 범죄 관련 직접적인 위험이 확인된
            게시물, 관련 법령에서 홍보, 광고, 판매 등을 금지하고 있는 물건 또는
            서비스를 홍보, 광고, 판매하는 내용의 게시물, 타인의 지식재산권 등을
            침해하거나 모욕, 사생활 침해 또는 명예훼손 등 타인의 권리를 침해하는
            내용이 확인된 게시물은 제한될 수 있습니다.
          </div>
          <div>
            4.자극적이고 노골적인 성행위를 묘사하는 등 타인에게 성적 수치심을
            유발시키거나 왜곡된 성 의식 등을 야기할 수 있는 내용의 게시물,
            타인에게 잔혹감 또는 혐오감을 일으킬 수 있는 폭력적이고 자극적인
            내용의 게시물, 본인 이외의 자를 사칭하거나 허위사실을 주장하는 등
            타인을 기만하는 내용의 게시물, 과도한 욕설, 비속어 등을 계속하여
            반복적으로 사용하여 심한 혐오감 또는 불쾌감을 일으키는 내용의
            게시물은 제한될 수 있습니다.
          </div>
          <div>
            5.자동화된 수단을 활용하는 등 On 서비스의 기능을 비정상적으로
            이용하여 게재된 게시물, 네이버 각 개별 서비스의 제공 취지와 부합하지
            않는 내용의 게시물은 다른 이용자들의 정상적인 네이버 서비스 이용에
            불편을 초래하고 더 나아가 On의 원활한 서비스 제공을 방해하므로 역시
            제한될 수 있습니다.
          </div>
          <div>
            6.문의사항은 언제든지 On 고객센터 이메일로 문의해 주시면
            감사하겠습니다.
          </div>
          <br />
          <Text size="1.1rem">개인 정보 처리 방침</Text>
          <br />
          <Text>수집하는 개인 정보의 항목</Text>
          <div>On은 서비스 제공을 위해 최소한의 개인정보를 수집합니다.</div>
          <Text>수집한 개인 정보의 처리 목적</Text>
          <div>
            수집된 개인정보는 다음의 목적에 한해 이용됩니다. <br />
            1. 가입 및 인증 의사 확인, 회원 식별 및 관리, 파견교 인증 <br />
            2. 이용자 친화적 서비스 제공 <br />
            3. 불법, 약관 위반 게시물 게시와 같은 부정행위 방지 <br />
            4. 회원관리, 서비스 운영 및 유지보수를 위한 통계자료 도출 <br />
            5. 신뢰할 수 있는 커뮤니티를 위한 작성자 정보 제공(정보 노출 여부
            선택 가능)
          </div>
          <Text>개인 정보의 파기</Text>
          <div>
            1. On은 약관 동의 철회와 게시글 삭제 등 개인정보 수집 및 이용 목적이
            달성될 경우, 지체없이 해당 정보를 파기합니다.
            <br />
            2. 개인정보를 파기할 경우, 재생이 불가능한 방법으로 파기합니다.
          </div>
          <Text>정보 주체의 권리, 의무 및 행사</Text>
          <div>
            회원은 언제든지 서비스 내부에서 자신의 개인정보를 조회하거나 수정,
            삭제할 수 있습니다.
          </div>
        </pre>
      </TermContent>
      <div className="radioBtn">
        <label style={{ color: 'black' }}>
          <s.RadioButton
            type="radio"
            name="termConsent"
            value="disagree"
            onChange={() => {
              setActive(false);
            }}
          />
          비동의
        </label>
        <label style={{ color: 'black' }}>
          <s.RadioButton
            type="radio"
            name="termConsent"
            value="agree"
            onChange={() => setActive(true)}
          />
          동의
        </label>
      </div>
    </>
  );
};

const TermContent = styled.div`
  color: black;
  overflow: auto;
  height: 23rem;
  flex-shrink: 1;
  margin: 0.313rem 0rem;
  padding: 1rem 1.5rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  text-align: justify;
  border-radius: 1.1875rem;
  background: #f4f4f4;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.div`
  font-size: ${(props) => (props.size ? props.size : 'normal')};
  font-weight: bold;
`;
const Bold = styled.div`
  display: inline;
  font-weight: bold;
`;
import {
  CHECK_DUPLICATE_ID,
  CHECK_DUPLICATE_NICK,
  VERIFY_CODE,
  SEND_VERIFICATION_CODE,
} from '../../api/urls';
import { useForm } from 'react-hook-form';
const apiDupCheck = async (url, target, dupCheckSetter, dupCheck) => {
  const response = await postData(url, target.value, {
    'Content-Type': 'text/plain',
  });
  if (response) {
    //console.log(response);
    if (response.data) {
      //true면 존재한다는 것
      dupCheckSetter({ ...dupCheck, [target.name]: -1 });
    } else {
      dupCheckSetter({ ...dupCheck, [target.name]: 1 });
    }
  }
};

export const UserInfoForm1 = ({
  state,
  updateUserInfo,
  setActive,
  setDupCheck,
  dupCheck,
  verifyCode,
  setVerifyCode,
}) => {
  const passwordSet = useRef({ pw: state.password, pw_check: '' });
  const id = useRef(state.loginId);
  const code = useRef();

  const {
    register,
    formState: { errors, isValid },
    watch,
    setError,
    clearErrors,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (verifyCode.verified) {
      setActive(isValid);
    } else {
      setActive(false);
    }
  }, [isValid, verifyCode.verified]);

  return (
    <>
      <s.InputWrapper>
        <s.Div>이메일</s.Div>
        <SpaceBetweenContainer>
          <s.TransparentInput
            type="text"
            name="loginId"
            defaultValue={state.loginId}
            aria-invalid={errors.loginId ? 'true' : 'false'}
            {...register('loginId', {
              required: '이메일을 입력해주세요.',
              onChange: (e) => {
                updateUserInfo(e);
                id.current = e.target.value;
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: '이메일 형식에 맞게 입력해주세요.',
              },
            })}
          />
          {dupCheck.loginId < 1 ? (
            <s.GrayButton
              disabled={errors.loginId}
              onClick={(e) => {
                e.preventDefault();
                apiDupCheck(
                  CHECK_DUPLICATE_ID,
                  {
                    name: 'loginId',
                    value: id.current,
                  },
                  setDupCheck,
                  dupCheck,
                );
              }}
            >
              중복검사
            </s.GrayButton>
          ) : (
            <img src={validImg} />
          )}
          <s.GrayButton
            disabled={errors.loginId || dupCheck.loginId < 1}
            onClick={async (e) => {
              e.preventDefault();
              const res = await postData(SEND_VERIFICATION_CODE, id.current, {
                'Content-Type': 'text/plain',
              });
              if (res.status == 200) {
                alert('메일로 인증번호가 발송되었습니다.');
                setVerifyCode({ ...verifyCode, isSent: true, verified: false });
              }
            }}
          >
            인증
          </s.GrayButton>
        </SpaceBetweenContainer>
      </s.InputWrapper>
      <s.Explanation role="alert">
        {errors.loginId && errors.loginId.message}
      </s.Explanation>
      {dupCheck.loginId === 1 && (
        <s.Explanation>사용할 수 있는 아이디입니다.</s.Explanation>
      )}
      {dupCheck.loginId === -1 && (
        <s.Explanation>이미 존재하는 아이디입니다.</s.Explanation>
      )}
      <s.InputWrapper>
        <s.Div>인증 코드</s.Div>
        <SpaceBetweenContainer>
          <s.TransparentInput
            type="text"
            name="signUpAuthNum"
            defaultValue={verifyCode.verifyCodeContent}
            aria-invalid={errors.code ? 'true' : 'false'}
            {...register('signUpAuthNum', {
              onChange: (e) => {
                code.current = e.target.value;
                setVerifyCode({
                  ...verifyCode,
                  verified: false,
                  verifyCodeContent: code.current,
                });

                updateUserInfo(e);
              },
              required: '인증번호를 입력해주세요.',
            })}
          />

          {verifyCode.verified ? (
            <img src={validImg} />
          ) : (
            <s.GrayButton
              disabled={!verifyCode.isSent}
              onClick={async (e) => {
                e.preventDefault();
                const data = {
                  loginId: id.current,
                  authNum: parseInt(code.current),
                };
                const formData = JSON.stringify(data);
                //console.log('F.formData:', formData);
                try {
                  const res = await putData(VERIFY_CODE, formData);
                  if (res) {
                    if (code.current && res.data) {
                      setVerifyCode({ ...verifyCode, verified: true });
                    } else if (res.data == false) {
                      alert('인증번호가 일치하지 않습니다.');
                    }
                  }
                } catch (error) {
                  if (error.response.status == Number(401)) {
                    alert(
                      '인증번호가 만료되었습니다. 인증번호를 다시 요청해주세요.',
                    );
                  }
                }
              }}
            >
              인증하기
            </s.GrayButton>
          )}
        </SpaceBetweenContainer>
      </s.InputWrapper>
      <s.InputWrapper>
        <s.Div>비밀번호</s.Div>
        <SpaceBetweenContainer>
          <s.TransparentInput
            type="password"
            name="password"
            defaultValue={state.password}
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              onChange: (e) => {
                updateUserInfo(e);
                passwordSet.current.pw = e.target.value;
                if (passwordSet.current.pw != passwordSet.current.pw_check) {
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
          {passwordSet.current.pw && !errors.password && <img src={validImg} />}
        </SpaceBetweenContainer>
      </s.InputWrapper>
      <s.Explanation role="alert">
        {errors.password && errors.password.message}
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
                //console.log(value == passwordSet.current.pw);
                return value == passwordSet.current.pw
                  ? true
                  : '비밀번호가 일치하지 않습니다';
              },
              onChange: (e) => {
                passwordSet.current.pw_check = e.target.value;
                if (passwordSet.current.pw_check !== passwordSet.current.pw) {
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
      <s.Explanation role="alert">
        {errors.password_check && errors.password_check.message}
      </s.Explanation>
    </>
  );
};

const SpaceBetweenContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfoForm2 = ({
  state,
  updateUserInfo,
  setActive,
  setDupCheck,
  dupCheck,
}) => {
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (dupCheck.nickname == 1) {
      setActive(isValid);
    } else {
      setActive(false);
    }
  }, [isValid, dupCheck.nickname]);

  return (
    <>
      <s.InputWrapper>
        <s.Div>이름</s.Div>
        <s.TransparentInput
          placeholder="본명으로 작성해 주세요"
          name="name"
          defaultValue={state.name}
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

      <s.TwoColumnWrapper>
        <div>
          <s.InputWrapper>
            <s.Div>생년월일</s.Div>
            <s.TransparentInput
              type="date"
              name="birth"
              placeholder="생년월일을 입력하세요."
              defaultValue={state.birth} // 기존 데이터가 있다면 불러오기
              aria-invalid={errors.birth ? 'true' : 'false'}
              {...register('birth', {
                required: '생년월일은 필수입니다.',
                onChange: (e) => {
                  updateUserInfo(e); // 상태 업데이트
                },
                validate: (value) => {
                  // 선택된 날짜가 유효한 날짜인지 추가 검증
                  const isValidDate = !isNaN(new Date(value).getTime());
                  return isValidDate || '유효한 날짜를 입력해주세요.';
                },
              })}
            />
          </s.InputWrapper>
        </div>

        <EmptyDiv></EmptyDiv>
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
            defaultValue={state.gender}
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
      </s.TwoColumnWrapper>
      <s.InputWrapper>
        <s.Div>전화번호</s.Div>
        <s.TransparentInput
          type="tel"
          placeholder="'-' 없이 숫자만 입력해주세요"
          //inputMode="numeric"
          pattern="\d*"
          name="phone"
          defaultValue={state.phone}
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
        <s.Div>닉네임</s.Div>
        <SpaceBetweenContainer>
          <s.TransparentInput
            type="text"
            name="nickname"
            defaultValue={state.nickname}
            aria-invalid={errors.nickname ? 'true' : 'false'}
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              onChange: (e) => {
                updateUserInfo(e);
              },
            })}
          />
          {dupCheck.nickname < 1 ? (
            <s.GrayButton
              onClick={async (e) => {
                e.preventDefault();
                if (state.nickname === '') {
                  return;
                }
                apiDupCheck(
                  CHECK_DUPLICATE_NICK,
                  {
                    name: 'nickname',
                    value: state.nickname,
                  },
                  setDupCheck,
                  dupCheck,
                );
              }}
            >
              중복확인
            </s.GrayButton>
          ) : (
            <img src={validImg} />
          )}
        </SpaceBetweenContainer>
      </s.InputWrapper>
      {dupCheck.nickname === 0 && state.nickname && (
        <s.Explanation>중복검사를 해주세요.</s.Explanation>
      )}
      {dupCheck.nickname === 1 && (
        <s.Explanation>사용할 수 있는 닉네임입니다.</s.Explanation>
      )}
      {dupCheck.nickname === -1 && (
        <s.Explanation>이미 존재하는 닉네임입니다.</s.Explanation>
      )}
    </>
  );
};

const EmptyDiv = styled.div`
  width: calc(100% / 13);
`;

import DefaultCheckBox from '../../components/DefaultCheckBox/DefaultCheckBox';
import { countries } from '../../assets/cityDatabase';

const ContinentAndCountryItem = ({ content }) => {
  return (
    <>
      <option
        value={content.continent}
        disabled
      >
        ----{content.continent}----
      </option>
      <option
        key={content.id}
        value={content.country}
      >
        {content.country}
      </option>
    </>
  );
};

export const SchoolInfoForm = ({ state, updateUserInfo, setActive }) => {
  let id = -1;
  const [isConfirmed, setIsConfirmed] = useState(true);

  const onClickDsptchNotConfirmed = (e) => {
    // if (e.target.value) {
    //   state.dispatchedUniversity = '';
    //   state.universityUrl = '';
    //   state.country = '';
    //   state.dispatchedType = '';
    // }
    setIsConfirmed(!e.target.value);
    updateUserInfo({
      target: { name: e.target.name, value: !e.target.value }, //state는 비동기적이라 바로 적용안됨
    });
  };
  //console.log(state);

  useEffect(() => {
    //이전 단계를 눌로 페이지에 다시 돌아왔을 때, 렌더링하며 이전 입력값 불러오고 조건 체크
    if (!state.isDispatchConfirmed) {
      setIsConfirmed(false);
      setActive(true);
    } else {
      if (state.dispatchedUniversity && state.country && state.dispatchType) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [state]);

  return (
    <>
      <s.InputWrapper style={{ opacity: isConfirmed ? '100%' : '50%' }}>
        <div
          style={{ color: 'black' }}
          className="required"
        >
          나의 교환/방문교
        </div>
        <s.TransparentInput
          placeholder="학교의 공식 영문명을 작성해주세요"
          name="dispatchedUniversity"
          onChange={(e) => {
            updateUserInfo(e);
          }}
          disabled={!isConfirmed}
          defaultValue={state.dispatchedUniversity}
        />
      </s.InputWrapper>
      <DefaultCheckBox
        wrapperStyle={{
          marginTop: '30px',
          color: isConfirmed ? '' : 'black',
        }}
        after="교환/방문교 미정"
        checkBoxStyle={{
          border: '0.5px solid #C6C6C6',
          width: '13px',
          height: '13px',
        }}
        onChange={onClickDsptchNotConfirmed}
        name="isDispatchConfirmed"
        defaultValue={!state.isDispatchConfirmed}
      />

      <s.InputWrapper style={{ opacity: isConfirmed ? '100%' : '50%' }}>
        <div>교환/방문교 홈페이지 링크 </div>
        <s.TransparentInput
          placeholder="교환/방문교의 웹 사이트 주소를 붙여넣기 해주세요."
          disabled={!isConfirmed}
          onChange={updateUserInfo}
          name="universityUrl"
          defaultValue={state.universityUrl}
        />
      </s.InputWrapper>
      <s.Explanation style={{ marginTop: '5px', fontSize: '0.83rem' }}>
        사이트 주소는 가입 이후 마이페이지에서 수정하실 수 있습니다.
      </s.Explanation>

      <s.InputWrapper
        style={{
          color: 'black',
          border: 'none',
          opacity: isConfirmed ? '100%' : '50%',
        }}
      >
        <div className="required">교환/방문교 소재 국가</div>
        <s.SchoolComboBox
          defaultValue={state.country}
          onChange={updateUserInfo}
          disabled={!isConfirmed}
          name="country"
        >
          <option
            value=""
            hidden
            style={{ fontSize: '0.9rem' }}
          >
            국가
          </option>
          {countries.map((content) => {
            if (content.id[0] > id) {
              id = content.id[0];
              return (
                <ContinentAndCountryItem
                  key={content.continent}
                  content={content}
                />
              );
            }
            return (
              <option
                key={content.id}
                value={content.country}
              >
                {content.country}
              </option>
            );
          })}
        </s.SchoolComboBox>
      </s.InputWrapper>

      <s.InputWrapper
        style={{
          color: 'black',
          border: 'none',
          opacity: isConfirmed ? '100%' : '50%',
        }}
      >
        파견 유형
        <RadioBtnDiv>
          <label>
            <s.RadioButton
              type="radio"
              name="dispatchType"
              value="DISPATCHED"
              disabled={!isConfirmed}
              onChange={updateUserInfo}
            />
            교환학생
          </label>
          <label>
            <s.RadioButton
              type="radio"
              name="dispatchType"
              value="VISIT"
              disabled={!isConfirmed}
              onChange={updateUserInfo}
            />
            방문학생
          </label>
        </RadioBtnDiv>
      </s.InputWrapper>
    </>
  );
};

const RadioBtnDiv = styled.div`
  & > label {
    display: inline-block;
    padding-top: 0.938rem;
    margin-right: 0.938rem;
  }
`;

import addPhoto from '../../assets/images/addPhoto.svg';
import { postData, putData } from '../../api/Functions';
import { Background } from '../MyPage/MyPageStyled';

export const SchoolAuthForm = ({ state, setFile }) => {
  const [preview, setPreview] = useState(null);
  const onChangeImgFile = (fileList) => {
    if (fileList[0]) {
      //console.log(fileList[0]);
      const uploadImg = fileList[0];
      setPreview(URL.createObjectURL(uploadImg));
      setFile(uploadImg);
    }
  };
  return (
    <>
      <s.InputWrapper>
        <div>나의 교환/방문교</div>
        <s.TransparentInput
          disabled={true}
          value={
            state.dispatchedUniversity
              ? state.dispatchedUniversity
              : '파견교 미정'
          }
        />
      </s.InputWrapper>

      <s.CenterContainer>
        <label>
          <input
            accept=".jpg, .jpeg, .png"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              onChangeImgFile(e.target.files);
            }}
          />
          {state.isDispatchConfirmed ? (
            <AddPhoto src={preview ? preview : addPhoto} />
          ) : null}
        </label>
      </s.CenterContainer>
    </>
  );
};

const AddPhoto = styled.img`
  width: 310px;
  height: 310px;
  margin: 26px 40px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 0.625rem;
`;
