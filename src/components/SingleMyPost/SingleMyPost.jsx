import * as s from './SingleMyPostStyled';
import { showDate } from '../Common/InfoExp';
import { useNavigate } from 'react-router-dom';

const SingleMyPost = ({
  postId,
  title,
  time,
  content,
  nickName,
  image,
  comment,
  categories,
  verified,
  boardType,
}) => {
  const formatTime = showDate(time);
  const navigate = useNavigate();
  const deletePost = ()=>{
    
  }

  return (
    <s.PostWrapper
      onClick={() =>
        navigate(`/community/${boardType}/detail/${postId}`, {
          state: { value: postId },
        })
      }
    >
      <s.PostContainer>
        <s.Top>
          <s.Title>{title}</s.Title>
          <s.Time>{formatTime}</s.Time>
        </s.Top>

        <s.ContentText>{content}</s.ContentText>
        {image.length > 0 && (
          <s.ContentImg
            src={image} // 첫 번째 이미지를 표시하도록 설정
          />
        )}
        <s.Info>
          <span style={{ color: '#7A7A7A', marginRight: '0.3rem' }}>
            {nickName}
          </span>
          {verified ? <s.VerifiedSvg /> : ''}
          <s.CommentSvg />
          <span style={{ color: '#92A5BC' }}>{comment}</span>
        </s.Info>
      </s.PostContainer>
      <s.Delete>삭제</s.Delete>
    </s.PostWrapper>
  );
};

export default SingleMyPost;
