import styled from 'styled-components';
import replyBtnImg from '../../assets/images/replyBtnImg.svg';
import { forwardRef } from 'react';

const Comment = ({
  comment,
  onCommentClick,
  clickedComment,
  postWriter_id,
}) => {
  return (
    <CommentAndReplyWrapper>
      <CommentDiv
        onClick={() => {
          onCommentClick({
            target: {
              writer:
                comment.writerInfo.id === postWriter_id
                  ? '글쓴이'
                  : comment.writerInfo.nickname,
              comment: comment,
            },
          });
        }}
        style={{
          backgroundColor:
            clickedComment === comment ? '#bfd8e5dd' : '#d9d9d933',
        }}
      >
        <Writer writer={`${comment.writerInfo.id === postWriter_id}`}>
          {comment.writerInfo.id === postWriter_id
            ? '글쓴이'
            : comment.writerInfo.nickname}
          <img
            src={replyBtnImg}
            style={{ width: '0.75rem', height: '0.8rem' }}
          />
        </Writer>
        <Content>{comment.contents}</Content>
      </CommentDiv>
    </CommentAndReplyWrapper>
  );
};

export default Comment;

const CommentAndReplyWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.44rem 0 0 0;
`;

const CommentDiv = styled.div`
  box-sizing: border-box;
  padding: 10px 0.56rem 0.56rem 1.19rem;
  margin: 0.44rem 0 0 0;
  width: 100%;
  height: auto;
  border-radius: 0.625rem;
  border: 0.5px solid #d9d9d9;
  background: rgba(217, 217, 217, 0.4);

  color: #3d3d3d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  text-align: left;
  white-space: pre-wrap;
`;

const Writer = styled.div`
  padding: 3px 0;
  color: ${(props) => (props.writer === 'true' ? '#3E73B2' : '#5C5C5C')};
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 0.5rem 0;

  color: #5c5c5c;
  white-space: normal;
  word-break: break-all;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
