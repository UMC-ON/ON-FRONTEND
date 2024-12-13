import { useNavigate } from 'react-router-dom';
import * as s from './SingleChatStyled';

const SingleTradeChat = ({ time, message, img, senderName, roomId }) => {
  const navigate = useNavigate();

  return (
    <s.SingleChatContainer
      onClick={() =>
        navigate(`/chat/trade/${roomId}`, {
          state: { roomId: roomId, senderName: senderName },
        })
      }
    >
      {img && img.length > 0 ? (
        <s.TradePicture
          src={img}
          alt="no img"
        />
      ) : (
        <s.NoTradePicture />
      )}
      <s.Nickname>{senderName}</s.Nickname>
      <s.Time>{time}</s.Time>
      <s.Message>{message}</s.Message>
    </s.SingleChatContainer>
  );
};

export default SingleTradeChat;
