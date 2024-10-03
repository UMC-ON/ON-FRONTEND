import landingImg from '../../assets/images/landingImg.svg';
//import landingLogo from '../../assets/images/landingLogo.svg';
//import changedLandingLogo from '../../assets/images/changedLandingLogo.svg';

import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const nav = useNavigate();
  return (
    <>
      <LandingPageContainer>
        <Text>{`나만의 완벽한
      교환/방문 라이프를 키다`}</Text>
        <LogoImg />

        <ImgImg style={{ alignSelf: 'center' }} />

        <ButtonSection>
          <Button
            onClick={() => {
              nav('/signIn');
            }}
          >
            로그인
          </Button>
          <Button onClick={() => nav('/signUp')}>회원가입</Button>
        </ButtonSection>

        <GradientImg />
      </LandingPageContainer>
    </>
  );
};

export default LandingPage;

const LandingPageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0 2.5rem;
`;

const Text = styled.pre`
  color: #ccc;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.02rem;
  white-space: pre-line;
  text-align: left;
  position: absolute;
  bottom: 80%;
`;
const landingLogo = `<svg width="241" height="148" viewBox="0 0 241 148" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2945_8479)">
<path d="M139.439 74.0017C139.439 90.0415 136.335 103.556 130.13 114.553C123.922 125.55 115.546 133.874 105 139.525C94.4534 145.176 82.6933 148 69.7196 148C56.7459 148 44.8559 145.152 34.3333 139.453C23.8108 133.753 15.4556 125.409 9.27475 114.412C3.09044 103.416 0 89.9454 0 74.0017C0 58.0581 3.09044 44.4471 9.27475 33.4504C15.4591 22.4537 23.8108 14.1298 34.3333 8.47854C44.8593 2.82733 56.6536 0 69.7196 0C82.7856 0 94.4534 2.82733 105 8.47511C115.546 14.1263 123.922 22.4503 130.13 33.4469C136.335 44.4436 139.439 57.9619 139.439 73.9983V74.0017ZM99.4002 74.0017C99.4002 65.3755 98.2686 58.0924 96.0055 52.1595C93.7423 46.2266 90.4058 41.7262 85.9957 38.655C81.5857 35.5838 76.1603 34.0481 69.7196 34.0481C63.2789 34.0481 57.8535 35.5838 53.4435 38.655C49.0335 41.7262 45.6969 46.23 43.4337 52.1595C41.1706 58.0924 40.039 65.372 40.039 74.0017C40.039 82.6314 41.1706 89.911 43.4337 95.8439C45.6969 101.777 49.0335 106.277 53.4435 109.348C57.8535 112.42 63.2789 113.955 69.7196 113.955C76.1603 113.955 81.5857 112.42 85.9957 109.348C90.4058 106.277 93.7423 101.777 96.0055 95.8439C98.2686 89.911 99.4002 82.6314 99.4002 74.0017Z" fill="url(#paint0_linear_2945_8479)"/>
<path d="M241 94.841C240.99 69.3504 220.426 48.6899 195.057 48.6899C169.687 48.6899 149.124 69.3504 149.114 94.841V148H181.878V96.4625C181.885 95.9334 181.912 95.4215 181.953 94.92H181.96C181.96 94.8925 181.96 94.865 181.96 94.8375C181.96 87.5579 187.833 81.6559 195.077 81.6559C202.321 81.6559 208.195 87.5579 208.195 94.8375C208.195 94.865 208.195 94.8925 208.195 94.92H208.201C208.229 95.4215 208.242 95.9334 208.239 96.4625V148H241.003V94.841H241Z" fill="url(#paint1_linear_2945_8479)"/>
</g>
<defs>
<linearGradient id="paint0_linear_2945_8479" x1="0" y1="0" x2="147.738" y2="139.192" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
<linearGradient id="paint1_linear_2945_8479" x1="149.114" y1="48.6899" x2="248.125" y2="140.303" gradientUnits="userSpaceOnUse">
<stop stop-color="#D6EBFF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
<clipPath id="clip0_2945_8479">
<rect width="241" height="148" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const changedLandingLogo = `<svg width="241" height="148" viewBox="0 0 241 148" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2945_8479)">
<path d="M139.439 74.0017C139.439 90.0415 136.335 103.556 130.13 114.553C123.922 125.55 115.546 133.874 105 139.525C94.4534 145.176 82.6933 148 69.7196 148C56.7459 148 44.8559 145.152 34.3333 139.453C23.8108 133.753 15.4556 125.409 9.27475 114.412C3.09044 103.416 0 89.9454 0 74.0017C0 58.0581 3.09044 44.4471 9.27475 33.4504C15.4591 22.4537 23.8108 14.1298 34.3333 8.47854C44.8593 2.82733 56.6536 0 69.7196 0C82.7856 0 94.4534 2.82733 105 8.47511C115.546 14.1263 123.922 22.4503 130.13 33.4469C136.335 44.4436 139.439 57.9619 139.439 73.9983V74.0017ZM99.4002 74.0017C99.4002 65.3755 98.2686 58.0924 96.0055 52.1595C93.7423 46.2266 90.4058 41.7262 85.9957 38.655C81.5857 35.5838 76.1603 34.0481 69.7196 34.0481C63.2789 34.0481 57.8535 35.5838 53.4435 38.655C49.0335 41.7262 45.6969 46.23 43.4337 52.1595C41.1706 58.0924 40.039 65.372 40.039 74.0017C40.039 82.6314 41.1706 89.911 43.4337 95.8439C45.6969 101.777 49.0335 106.277 53.4435 109.348C57.8535 112.42 63.2789 113.955 69.7196 113.955C76.1603 113.955 81.5857 112.42 85.9957 109.348C90.4058 106.277 93.7423 101.777 96.0055 95.8439C98.2686 89.911 99.4002 82.6314 99.4002 74.0017Z" fill="url(#paint0_linear_2945_8479)"/>
<path d="M241 94.841C240.99 69.3504 220.426 48.6899 195.057 48.6899C169.687 48.6899 149.124 69.3504 149.114 94.841V148H181.878V96.4625C181.885 95.9334 181.912 95.4215 181.953 94.92H181.96C181.96 94.8925 181.96 94.865 181.96 94.8375C181.96 87.5579 187.833 81.6559 195.077 81.6559C202.321 81.6559 208.195 87.5579 208.195 94.8375C208.195 94.865 208.195 94.8925 208.195 94.92H208.201C208.229 95.4215 208.242 95.9334 208.239 96.4625V148H241.003V94.841H241Z" fill="url(#paint1_linear_2945_8479)"/>
</g>
<defs>
<linearGradient id="paint0_linear_2945_8479" x1="0" y1="0" x2="147.738" y2="139.192" gradientUnits="userSpaceOnUse">
<stop stop-color="#C2C7FF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
<linearGradient id="paint1_linear_2945_8479" x1="149.114" y1="48.6899" x2="248.125" y2="140.303" gradientUnits="userSpaceOnUse">
<stop stop-color="#C2C7FF"/>
<stop offset="1" stop-color="#C2C7FF"/>
</linearGradient>
<clipPath id="clip0_2945_8479">
<rect width="241" height="148" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const encodedLandingLogo = encodeURIComponent(landingLogo)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const encodedChangedLandingLogo = encodeURIComponent(changedLandingLogo)
  .replace(/'/g, '%27')
  .replace(/"/g, '%22');
const changeLogo = keyframes`
    0%{
        background-image: url('data:image/svg+xml,${encodedLandingLogo}')
    }
        45%{
        background-image: url('data:image/svg+xml,${encodedChangedLandingLogo}')}
        55%{
            background-image: url('data:image/svg+xml,${encodedChangedLandingLogo}')}
        100%{
            background-image: url('data:image/svg+xml,${encodedLandingLogo}');
        }
`;
const LogoImg = styled.div`
  background: url('data:image/svg+xml,${encodedLandingLogo}') no-repeat center;
  background-size: cover;
  width: 15.06269rem;
  height: 9.25rem;
  flex-shrink: 0;
  position: absolute;
  bottom: 59%;
  animation: ${changeLogo} 2.5s 0s infinite;
`;

const ImgImg = styled.div`
  width: 12.4375rem;
  height: 9.0625rem;
  background-image: url(${landingImg});
  position: absolute;
  bottom: 32%;
`;

const GradientImg = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  max-width: '480px';
  max-height: 40%;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(187, 222, 255, 0) 0%,
    rgba(187, 222, 255, 0.6) 100%
  );
`;
const ButtonSection = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 10%;
  left: 0;
  z-index: 1;
`;

const Button = styled.button`
  width: 19rem;
  height: 3.25rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: linear-gradient(135deg, #c2c7ff 0%, #ad99ff 100%);
  box-shadow: 4px 4px 24px -1px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0.35rem 0;
`;
