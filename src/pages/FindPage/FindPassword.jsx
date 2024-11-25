import * as s from '../SignUp/SignUpStyled';
import groupLogo from '../../assets/images/groupLogo.svg';
import styled from 'styled-components';

const FindPassword = () => {
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
                ID
                <s.TransparentInput placeholder="가입하신 아이디를 입력해주세요" />
              </s.InputWrapper>
              <s.InputWrapper>
                아이디
                <s.TransparentInput />
              </s.InputWrapper>
            </s.ContentSection>
          </s.SectionWrapper>
        </s.FormPage>
      </form>
    </>
  );
};

export default FindPassword;
