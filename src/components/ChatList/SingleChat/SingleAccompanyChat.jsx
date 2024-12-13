import * as s from './SingleChatStyled';
import { useNavigate } from 'react-router-dom';
import { ChatCountryIcon } from '../../CountryIcon';
import locationImg from '../../../assets/images/location.svg';

const SingleAccompanyChat = ({
  time,
  message,
  roomId,
  senderName,
  location,
}) => {
  const navigate = useNavigate();

  return (
    <s.SingleChatContainer
      onClick={() =>
        navigate(`/chat/accompany/${roomId}`, {
          state: { roomId: roomId, senderName: senderName },
        })
      }
    >
      <ChatCountryIcon country={location} />
      <s.Nickname>{senderName}</s.Nickname>
      <s.Location>
        <img src={locationImg} />
        {location}
      </s.Location>
      <s.Time>{time}</s.Time>
      <s.Message>{message}</s.Message>
    </s.SingleChatContainer>
  );
};

export default SingleAccompanyChat;
