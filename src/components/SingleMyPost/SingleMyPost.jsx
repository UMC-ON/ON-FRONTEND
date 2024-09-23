import * as s from './SingleMyPostStyled';
import { showDate } from '../Common/InfoExp';

const SingleMyPost = ({
  postId,
  title,
  time,
  content,
  nickName,
  image,
  comment,
  categories,
  isAnonymous,
  isAnonymousUniv,
  userStatus,
  boardType,
}) => {
  const formatTime = showDate(time);

  return (
    <s.PostWrapper>
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
            {isAnonymous ? '익명' : nickName}
          </span>
          {userStatus === 'ACTIVE' && <s.VerifiedSvg />}
          <s.CommentSvg />
          <span style={{ color: '#92A5BC' }}>{comment}</span>
        </s.Info>
      </s.PostContainer>
      <s.Delete>삭제</s.Delete>
    </s.PostWrapper>
  );
};

export default SingleMyPost;
