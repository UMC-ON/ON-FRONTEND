import styled from 'styled-components';
import React from 'react';

import bubbleIcon from '../assets/images/greybubble.svg';

import { showDate } from '../components/Common/InfoExp';

import { useLocation, useNavigate } from 'react-router-dom';

function CommunityHomeList({ bgcolor, datas, type }) {
  const defaultRadius = '0 0 0 0';
  const topRadius = '15px 15px 0 0';
  const bottomRadius = '0 0 15px 15px';

  const navigate = useNavigate();
  const goDetail = (postId, companyId) => {
    if (type === 'info') {
      navigate(`./community/info/detail/${postId}`, {
        state: { value: postId },
      });
    } else if (type === 'free') {
      navigate(`./community/general/detail/${postId}`, {
        state: { value: postId },
      });
    } else if (type === 'accom') {
      navigate(`/accompany/detail/${companyId}`);
    }
  };

  return (
    <>
      {datas.map((data, index) => {
        const radius =
          index === 0
            ? topRadius
            : index === datas.length - 1
              ? bottomRadius
              : defaultRadius;
        const color = bgcolor;

        return (
          <Container
            key={index}
            radius={radius}
            color={color}
            onClick={() => goDetail(data.postId, data.companyPostId)}
          >
            <FlexContainer>
              <TextTopLeft>{data.title}</TextTopLeft>
              <Span>
                <SmallGreyText>{showDate(data.createdAt)}</SmallGreyText>
                {type == 'info' || type == 'free' ? (
                  <>
                    <IconTopLeft src={bubbleIcon} />
                    <SmallGreyText>{data.commentCount}</SmallGreyText>
                  </>
                ) : null}
              </Span>
            </FlexContainer>
            <TextMiddle2>{data.content}</TextMiddle2>
          </Container>
        );
      })}
    </>
  );
}

export default CommunityHomeList;

const Container = styled.div`
  background: ${(props) => props.color || 'rgba(191, 216, 229, 0.6)'};
  width: 90%;
  border-radius: ${(props) => props.radius || '0 0 0 0'};
  margin: 0 auto;
  border: 1px solid #ffffff;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.3rem;
  cursor: pointer;
`;

const TextTopLeft = styled.p`
  color: #363636;
  font-size: 1em;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 80%;
  text-align: left;
`;

const TextMiddle2 = styled.p`
  color: #838383;
  font-size: 0.8em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 70%;
  padding-left: 1vh;
  text-align: left;
`;

const SmallGreyText = styled.p`
  color: #7a7a7a;
  font-size: 0.5em;
  text-align: right;
  white-space: nowrap;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 0.5rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 7px;
`;

const IconTopLeft = styled.img`
  padding-left: 8px;
  padding-right: 3px;
`;
