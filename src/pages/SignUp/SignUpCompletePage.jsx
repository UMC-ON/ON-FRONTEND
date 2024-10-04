import * as s from './SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import { useNavigate } from 'react-router-dom';
import SignUpCompleteImg from '../../assets/images/SignUpCompleteImg.svg';

const SignUpCompletePage = () => {
  const navigate = useNavigate();
  const nav = () => {
    navigate('/signIn');
  };

  return (
    <s.FormPage>
      <s.SectionWrapper>
        <s.TitleSection>
          <s.Logo src={groupLogo} />
          <div className="on_exp">교환/방문학생 정보공유 커뮤니티, ON </div>
        </s.TitleSection>

        <s.CenterContainer>
          <s.StyledH2
            style={{
              fontSize: '2.5rem',
              marginTop: '8.5rem',
              marginBottom: '1.25rem',
            }}
          >
            회원가입 완료!
          </s.StyledH2>
          <s.Explanation className="margin_bottom_40">
            성공적인 교환 라이프를 위한 정보를 얻어 보세요.
          </s.Explanation>
          <img
            src={SignUpCompleteImg}
            style={{ margin: '2rem 0' }}
          />
        </s.CenterContainer>
      </s.SectionWrapper>
      <s.ButtonSection>
        <s.PurpleButton
          style={{
            background:
              'linear-gradient(116deg, #94C5FF 16.46%, #896CFF 83.54%)',
          }}
          onClick={nav}
        >
          로그인하기
        </s.PurpleButton>
      </s.ButtonSection>
    </s.FormPage>
  );
};
export default SignUpCompletePage;
