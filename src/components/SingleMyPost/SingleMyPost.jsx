import * as s from './SingleMyPostStyled';
import { showDate } from '../Common/InfoExp';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../api/Functions';
import { DELETE_MY_POST } from '../../api/urls';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';

const SingleMyPost = ({
  postId,
  title,
  time,
  content,
  nickName,
  image,
  comment,
  boardType,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); //삭제 누르는 순간 화면에서 바로 삭제를 위해
  const formatTime = showDate(time);
  const navigate = useNavigate();

  const deletePost = async () => {
    setIsLoading(true);
    try {
      const response = await deleteData(
        DELETE_MY_POST(boardType, postId),
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
        {},
      );
      //console.log(response);
      if (response.status === 200) {
        //console.log('성공');
        setIsDeleted(true); // 삭제 상태 업데이트
      }
    } catch (error) {
      //console.error('delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // 삭제된 경우 렌더링하지 않음
  if (isDeleted) {
    return null;
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
            src={image[0]} // 첫 번째 이미지를 표시하도록 설정
          />
        )}
        <s.Info>
          <span style={{ color: '#7A7A7A', marginRight: '1.12rem' }}>
            {nickName}
          </span>
          <s.CommentSvg />
          <span style={{ color: '#92A5BC' }}>{comment}</span>
        </s.Info>
      </s.PostContainer>
      <s.Delete
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 버블링 방지
          deletePost();
        }}
      >
        삭제
      </s.Delete>
    </s.PostWrapper>
  );
};

export default SingleMyPost;
