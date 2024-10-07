import * as s from './SingleChatStyled';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../assets/images/country_flag/default.svg';
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

  // function extractCityNames(arr) {
  //   return arr.map((item) => item.split(' ')[1]);
  // }

  // const cities = ['대한민국 부산', '일본 도쿄'];
  // const cityNames = extractCityNames(cities);
  // console.log(cityNames);

  return (
    <s.SingleChatContainer
      onClick={() =>
        navigate(`/chat/accompany/${roomId}`, {
          state: { roomId: roomId, senderName: senderName },
        })
      }
    >
      <ChatCountryIcon country={'독일'} />
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
