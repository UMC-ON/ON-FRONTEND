import styled from 'styled-components';

export const NoContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: fixed;
  z-index: 0;
`;

export const NoImg = styled.img`
  img {
    object-fit: cover;
  }
`;
export const NoText = styled.p`
  margin: 31px 0 61px;
  color: #7a7a7a;
  text-align: center;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
