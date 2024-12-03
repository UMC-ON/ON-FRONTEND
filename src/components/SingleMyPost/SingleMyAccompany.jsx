import * as s from './SingleMyAccompanyStyled';
import noImg from '../../assets/images/bannerDefault.svg';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../api/Functions';
import { DELETE_MY_ACCOMPANY_POST } from '../../api/urls';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';

const SingleMyAccompany = ({
  postId,
  title,
  date,
  content,
  image,
  totalRecruitNumber,
  currentRecruitNumber,
  location,
  locationNum,
  nickName,
  age,
  gender,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); //삭제 누르는 순간 화면에서 바로 삭제를 위해
  const formatDate = (postDate) => {
    //string형태로 전달
    //"2024-08-19T09:25:43.206Z"
    const createdDate = new Date(postDate);
    const today = new Date();
    if (today.getFullYear() - createdDate.getFullYear() > 0) {
      //올해 이 전
      const yy = ('' + createdDate.getFullYear()).slice(-2);
      const mm = ('0' + (createdDate.getMonth() + 1)).slice(-2);
      const dd = ('0' + createdDate.getDate()).slice(-2);
      return `${yy}/${mm}/${dd}`;
    }
    //오늘 이전에 작성된 글: MM/DD
    return `${createdDate.getMonth() + 1}/${createdDate.getDate()}`;
  };

  const navigate = useNavigate();
  const deletePost = async () => {
    setIsLoading(true);
    try {
      const response = await deleteData(
        DELETE_MY_ACCOMPANY_POST(postId),
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
    <s.PostWrapper>
      <s.PostContainer onClick={() => navigate(`/accompany/detail/${postId}`)}>
        {image.length > 0 ? (
          <s.ContentImg src={image[0]} />
        ) : (
          <s.ContentImg src={noImg}></s.ContentImg>
        )}
        <s.Title>
          <span>{title}</span>
        </s.Title>
        <s.TripInfo>
          <s.Date>
            <s.DateSvg />
            <span>{formatDate(date)}</span>
          </s.Date>
          <s.Num>
            <s.NumSvg />
            <span>
              ({currentRecruitNumber}/{totalRecruitNumber})
            </span>
          </s.Num>
          <s.Location>
            <s.LocationSvg />
            <span>
              {location}
              {locationNum > 1 ? <> +{locationNum - 1}</> : <></>}
            </span>
          </s.Location>
        </s.TripInfo>
        {//console.log(locationNum)}
        <s.ContentText>{content}</s.ContentText>
        <s.Info>
          <s.ProfileSvg />
          <span>{nickName}</span>
          <div />
          <span>{age}</span>
          <div />
          <span>{gender === 'FEMALE' ? '여자' : '남자'}</span>
        </s.Info>
        <s.Delete
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            deletePost();
          }}
        >
          삭제
        </s.Delete>{' '}
      </s.PostContainer>
    </s.PostWrapper>
  );
};

export default SingleMyAccompany;
