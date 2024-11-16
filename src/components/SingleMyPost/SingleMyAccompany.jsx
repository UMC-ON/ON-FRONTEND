import * as s from './SingleMyAccompanyStyled';
import noImg from '../../assets/images/bannerDefault.svg';
import { useNavigate } from 'react-router-dom';

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
  const formatDate = (postDate) => {
    //string형태로 전달
    //"2024-08-19T09:25:43.206Z"
    const createdDate = new Date(postDate);
    const today = new Date();
    const time = today.getTime() - createdDate.getTime();
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
        {console.log(locationNum)}

        <s.ContentText>{content}</s.ContentText>
        <s.Info>
          <s.ProfileSvg />
          <span>{nickName}</span>
          <div />
          <span>{age}</span>
          <div />
          <span>{gender === 'FEMALE' ? '여자' : '남자'}</span>
        </s.Info>
        <s.Delete>삭제</s.Delete>
      </s.PostContainer>
    </s.PostWrapper>
  );
};

export default SingleMyAccompany;
