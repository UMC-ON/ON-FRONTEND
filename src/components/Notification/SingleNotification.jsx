import * as s from './SingleNotificationStyled';
import notification_circle from '../../assets/images/notification_circle.svg';

const SingleNotification = () => {
  return (
    <s.NotificationContainer>
      <s.NotificationTitle>[정보글]</s.NotificationTitle>
      <s.NotificationTitle>
        내 동행글에 새로운 동행 신청 메시지가 왔어요
      </s.NotificationTitle>
      <s.NotificationText>
        그러면 6개월 전부터 시도해 보면 괜찮을까요?
      </s.NotificationText>
      <s.NotificationCircle
        src={notification_circle}
        alt="Notification Circle"
      />
    </s.NotificationContainer>
  );
};

export default SingleNotification;
