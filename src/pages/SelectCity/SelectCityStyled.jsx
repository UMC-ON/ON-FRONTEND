import styled from 'styled-components';
import theme from '../../styles/theme';

export const PageHeaderLayout = styled.div`
  width: 100%;
  max-width: 480px;
  height: 61px;
  position: fixed;
  z-index: 2;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: solid ${theme.lightGray};
  border-width: 0.5px 0;
  box-sizing: border-box;
  padding: 0 17px 0 17px;
`;
export const BackButton = styled.div`
  position: absolute;
  left: 17px;
`;
export const PageName = styled.p`
  text-align: center;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PageLayout = styled.div`
 width: 100%;
  max-height: 100vh;
  box-sizing: border-box;
  padding: 61px 0 15vh; 
  align-items: flex-start;
  flex-direction: column;
  background-color: white;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  overflow-y: auto;
`;
export const ContinentWrapper = styled.div`
  width: 100%;
   background-color: white;
`;

export const ContinentTitle = styled.p`
  color: #7a7a7a;
  text-align: left;
  font-family: Inter;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-left: 1.5rem;
  margin: 1.3rem 0;
`;

export const SingleCountryContainer = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  padding-left: 1.5rem;
  box-sizing: border-box;
  align-items: center;
  background: ${(props) =>
    props.selected
      ? 'linear-gradient(135deg, #D6EBFF 0%, #C2C7FF 100%)'
      : 'white'};
`;

export const Flag = styled.span`
  width: 2rem;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Country = styled.span`
  color: #363636;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 0.5rem;
`;

export const CityContainer = styled.div`
  width: 100%;
  opacity: 0.5;
  background: #ededed;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  box-sizing: border-box;
  padding: 0.4rem 3rem;
`;
export const City = styled.span`
  color: #363636;
  width: 100%;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  margin: 0.4rem 0;
  text-align: left;
`;
export const DownContainer = styled.div`
  position: absolute;
  right: 1.5rem;
  display: ${(props) => (props.selected ? 'flex' : 'none')};
`;
export const DownSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
    >
      <path
        d="M1 1L4.75671 5.17412C5.15395 5.6155 5.84605 5.6155 6.24329 5.17412L10 1"
        stroke="#7A7A7A"
        strokeLinecap="round"
      />
    </svg>
  );
};
