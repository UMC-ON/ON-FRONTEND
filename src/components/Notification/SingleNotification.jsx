import * as s from './SingleNotificationStyled';
//import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../api/Functions';
import { POST_READ_ALERT } from '../../api/urls';

const SingleNotification = ({
  id,
  title,
  content,
  alertType,
  alertConnectId,
  read,
  setError,
}) => {
  const navigate = useNavigate();

  const clickNotification = () => {
    if (read == false) {
      try {
        postData(
          POST_READ_ALERT(id),
          { alertId: id },
          {
            Authorization: `Bearer ${localStorage.getItem('AToken')}`,
          },
          {},
        );
      } catch (error) {
        setError(true);
      }
    }
    if (alertType === 'COMPANY') {
      navigate(`/accompany/detail/${alertConnectId}`, {
        state: { value: alertConnectId },
      });
    } else if (alertType === 'INFORMATION') {
      navigate(`/community/info/detail/${alertConnectId}`, {
        state: { value: alertConnectId },
      });
    } else if (alertType === 'FREE') {
      navigate(`/community/general/detail/${alertConnectId}`, {
        state: { value: alertConnectId },
      });
    } else if (alertType === 'COMPANY_CHAT') {
      navigate(`/chat/accompany/${alertConnectId}`, {
        state: { roomId: alertConnectId, senderName: title },
      });
    } else if (alertType === 'MARKET_CHAT') {
      navigate(`/chat/trade/${alertConnectId}`, {
        state: { roomId: alertConnectId, senderName: title },
      });
    }
  };
  if (read == true) {
    return (
      <s.ReadNotificationContainer onClick={() => clickNotification()}>
        <s.ReadNotificationTitle>{title}</s.ReadNotificationTitle>
        <s.NotificationText>{content}</s.NotificationText>
      </s.ReadNotificationContainer>
    );
  } else if (read == false) {
    return (
      <s.NotificationContainer onClick={() => clickNotification()}>
        <s.NotificationTitle>{title}</s.NotificationTitle>
        <s.NotificationText>{content}</s.NotificationText>
        <s.NotificationCircle />
      </s.NotificationContainer>
    );
  }
};

export default SingleNotification;
