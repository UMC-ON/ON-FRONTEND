import * as s from './SingleMyTradeStyled';
import noImg from '../../assets/images/bannerDefault.svg';
import { showDate } from '../Common/InfoExp';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        <s.Delete>삭제</s.Delete>
      </s.PostContainer>
    </s.PostWrapper>
  );
};

export default SingleMyTrade;
