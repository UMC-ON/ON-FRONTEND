import * as s from './SingleMyTradeStyled';
import noImg from '../../assets/images/bannerDefault.svg';
import { showDate } from '../Common/InfoExp';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../api/Functions';
import { DELETE_MY_MARKET_POST } from '../../api/urls';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';

const SingleMyTrade = ({
  postId,
  image,
  title,
  time,
  tradeStyle,
  isAvailable,
  user,
  location,
  price,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); //삭제 누르는 순간 화면에서 바로 삭제를 위해

  const navigate = useNavigate();

  const deletePost = async () => {
    setIsLoading(true);
    try {
      const response = await deleteData(
        DELETE_MY_MARKET_POST(postId),
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
        {},
      );
      console.log(response);
      if (response.status === 200) {
        console.log('성공');
        setIsDeleted(true); // 삭제 상태 업데이트
      }
    } catch (error) {
      console.error('delete error:', error);
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
      <s.PostContainer
        isAvailable={isAvailable}
        onClick={() => navigate(`/sell/${postId}`)}
      >
        {image.length > 0 ? (
          <s.ContentImg src={image[0]} />
        ) : (
          <s.ContentImg src={noImg}></s.ContentImg>
        )}
        <s.TitleContainer>
          <s.Title>{title}</s.Title>
          <s.Time>
            <span>{showDate(time)}</span>
          </s.Time>
        </s.TitleContainer>
        <s.TradingStyle>
          <span>{tradeStyle === 'DELIVERY' ? <>택배거래</> : <>직거래</>}</span>
          <div />
          {isAvailable === 'AWAIT' ? (
            <span>거래가능</span>
          ) : (
            <span style={{ color: '#868EE8', fontWeight: '700' }}>
              거래완료
            </span>
          )}
        </s.TradingStyle>
        <s.Info>
          <s.Location>
            <s.LocationSvg />
            <span>{location}</span>
          </s.Location>
          <s.User>
            <s.ProfileSvg />
            <span>{user}</span>
          </s.User>
        </s.Info>
        <s.Price> &#x20A9;{price}</s.Price>
        <s.Delete
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링 방지
            deletePost();
          }}
        >
          삭제
        </s.Delete>
      </s.PostContainer>
    </s.PostWrapper>
  );
};

export default SingleMyTrade;
