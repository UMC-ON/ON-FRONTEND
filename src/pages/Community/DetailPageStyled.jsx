import styled from 'styled-components';

export const PostInfoHeader = styled.div`
  width: 100%;
  max-width: 480px;
  height: 61px;
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: row;
  top: 0;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-width: 0.5px 0;
  box-sizing: border-box;
  padding: 0 1.5rem 0 17px;
`;

export const BackButton = styled.div``;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;
export const InfoLabel = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  white-space: wrap;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  gap: 0.38rem;
`;
export const Title = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1.25rem 1.125rem;
  margin: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.625rem;
  border: 3px solid transparent;

  border: 3px solid transparent;
  border-radius: 10px;
  background-image: linear-gradient(#f3f9ff, #f3f9ff),
    linear-gradient(135deg, #d6ebff, #c2c7ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;

  color: #1e1e1e;
  font-family: Inter;
  font-size: 1.4375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem; /* 130.435% */
`;

export const DispatchedInfo = styled.div`
  overflow: hidden;
  color: #5c5c5c;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.015rem;
  padding-top: 0.75rem;
`;
export const DetailPageLayout = styled.div`
  position: relative;
  background: white;
  box-sizing: border-box;
  width: 100%;
  //height: auto;
  //min-height: 100vh;
  padding-top: 61px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const NameInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  white-space: wrap;
  color: #5c5c5c;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const DateInfo = styled.div`
  overflow: hidden;
  color: #a3a3a3;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const Content = styled.pre`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 2rem 1.5rem;

  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;

  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CommentWritingDiv = styled.div`
  box-sizing: border-box;

  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
  flex-wrap: wrap;

  width: 100%;
  max-width: 480px;

  height: auto;
  //min-height: 70px;
  border-radius: 30px 30px 0px 0px;
  background: linear-gradient(
    135deg,
    ${(props) => props.color1 || '#f1f8ff 0%'},
    ${(props) => props.color1 || '#f2f3ff 100%'}
  );
  box-shadow: 0px -3px 3px 0px rgba(0, 0, 0, 0.05);
  padding: 14px 15px;
`;

export const EditorWrapper = styled.div`
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: start;
  flex: auto;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: start;
  padding: 0 0.94rem;
  font-size: 12px;
`;
export const CommentEditor = styled.textarea`
  box-sizing: border-box;
  background-color: transparent;
  border: none;

  flex: auto;
  width: 100%;

  &:focus {
    outline: none;
  }

  color: #3d3d3d;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;

  height: auto;
  min-height: 28px;
  max-height: 104px;

  &::-webkit-scrollbar {
    display: none;
  }

  resize: none;
  margin-top: 0.3rem;
`;

export const CommentSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  border: none;
  width: 100%;
  height: auto;
  padding: 0 30px;
  padding-bottom: 10rem;
`;

export const Comment = styled.div`
  box-sizing: border-box;
  padding: 10px 19px;
  width: 100%;
  height: auto;
  background-color: #d9d9d933;
  border: 2px solid #bfd8e533;
  border-radius: 10px;

  color: #3d3d3d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

export const Writer = styled.div`
  padding: 3px 0;
  color: #525252;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
`;
export const Reply = styled.div`
  box-sizing: border-box;
  padding: 10px 19px;
  width: 100%;
  height: auto;
  background-color: #d9d9d966;
  border: 2px solid #bfd8e533;
  border-radius: 10px;

  color: #3d3d3d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;

  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const CommentNumSection = styled.div`
  box-sizing: border-box;
  border: none;
  border-bottom: 3px solid;
  border-image: linear-gradient(190deg, #d6ebff 0%, #c2c7ff 100%);
  border-image-slice: 1;
  width: 100%;
  height: 38px;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  align-content: center;

  color: #92a5bc;
  font-family: Inter;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 12px */
  & > img {
    margin: 0 0.15rem;
  }
`;

export const ColorButtonTag = styled.button`
  box-sizing: border-box;
  width: auto;
  height: auto;
  max-width: 156px;
  min-height: 22px;

  background: ${(props) => props.color || '#BFD8E5'};

  padding: 0 8px;
  flex-shrink: 1;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.24px;

  white-space: wrap;

  &:focus {
    outline: none;
  }
`;
export const ImgSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: nowrap;
  gap: 1rem;
  padding-top: 1rem;
  overflow-x: scroll;
  &:hover::-webkit-scrollbar {
    display: inside;
    height: 0.5rem;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    width: 0.5rem;
    background: gray; /* 스크롤바 막대 색상 */
    /* 스크롤바 막대 테두리 설정  */
    border-radius: 12px;
  }
`;

export const ContentImg = styled.img`
  width: 112px;
  min-width: 112px;
  height: 112px;
  object-fit: cover;
  flex-shrink: 0;
`;
