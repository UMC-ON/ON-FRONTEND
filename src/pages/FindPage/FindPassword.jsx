import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const nav = useNavigate();
  return (
    <s.FormPage>
      <s.SectionWrapper>
        <s.TitleSection>
          <s.Logo src={groupLogo} />
          <img />
          <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
        </s.TitleSection>

        <s.ContentSection>
          <s.BackButton
            type="button"
            onClick={() => {
              nav('/signIn');
            }}
          >
            돌아가기
          </s.BackButton>

          <s.StyledH2>아이디 찾기</s.StyledH2>
          <s.Explanation>
            가입 시 등록한 아이디를 입력하시면 비밀번호를 알려드립니다.
          </s.Explanation>
          <s.InputWrapper>
            <div>ID</div>
            <s.TransparentInput
              placeholder="가입한 아이디"
              //onChange={updateUserInfo}
              name="id"
            />
          </s.InputWrapper>
        </s.ContentSection>
      </s.SectionWrapper>
      <s.ButtonSection>
        <s.PurpleButton
          style={{
            background: 'linear-gradient(135deg, #C2C7FF 0%, #AD99FF 100%)',
          }}
          onClick={nav}
        >
          비밀번호 찾기
        </s.PurpleButton>
      </s.ButtonSection>
    </s.FormPage>
  );
};

export default FindPassword;
