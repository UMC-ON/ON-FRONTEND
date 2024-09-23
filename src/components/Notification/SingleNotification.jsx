import * as s from './SingleNotificationStyled';

const SingleNotification = ({ title, content, alertType, alertConnectId }) => {
  return (
    <s.NotificationContainer>
      <s.NotificationTitle>{title}</s.NotificationTitle>
      <s.NotificationText>{content}</s.NotificationText>
      <s.NotificationCircle />
    </s.NotificationContainer>
  );
};

export default SingleNotification;
