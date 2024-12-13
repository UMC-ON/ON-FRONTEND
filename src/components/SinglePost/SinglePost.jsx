import * as s from './SinglePostStyled';
import { useNavigate } from 'react-router-dom';
import { showDate } from '../Common/InfoExp';

const SinglePost = ({
  postId,
  title,
  time,
  content,
  nickName,
  verified,
  comment,
  boardType,
}) => {
  const navigate = useNavigate();

  return (
    <s.SearchWrapper
      onClick={() =>
        navigate(`/community/${boardType}/detail/${postId}`, {
          state: { value: postId },
        })
      }
    >
      <s.Title>{title}</s.Title>
      <s.Time>{showDate(time)}</s.Time>
      <s.Content>{content}</s.Content>
      <s.Info>
        <s.Nickname>
          <span>{nickName}</span>
          {verified ? <s.VerifiedSvg /> : ''}
        </s.Nickname>

        <s.CommentSvg />
        <span style={{ color: '#92A5BC' }}>{comment}</span>
      </s.Info>

      {boardType === 'info' ? (
        <s.Categories $fontcolor="#3E73B2">정보 게시판</s.Categories>
      ) : (
        <s.Categories $fontcolor="#6458BF">자유 게시판</s.Categories>
      )}
    </s.SearchWrapper>
  );
};

export default SinglePost;
