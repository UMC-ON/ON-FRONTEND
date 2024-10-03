import { useEffect, useState } from 'react';
import * as s from './SingleNotificationStyled';
import theme from '../../styles/theme';

const SingleNotification = ({
  title,
  content,
  alertType,
  alertConnectId,
  read,
}) => {
  
  if (read == false) {
    return (
      <s.ReadNotificationContainer>
        <s.ReadNotificationTitle>{title}</s.ReadNotificationTitle>
        <s.NotificationText>{content}</s.NotificationText>
      </s.ReadNotificationContainer>
    );
  } else {
    return (
      <s.NotificationContainer>
        <s.NotificationTitle>{title}</s.NotificationTitle>
        <s.NotificationText>{content}</s.NotificationText>
        <s.NotificationCircle />
      </s.NotificationContainer>
    );
  }
};

export default SingleNotification;
