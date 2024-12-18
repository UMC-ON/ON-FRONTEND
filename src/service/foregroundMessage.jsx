import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from './initFirebase';

const messaging = getMessaging(app);

export const foregroundMessage = () => {
  onMessage(messaging, (payload) => {
    console.log('알림 도착 ', payload);
    alert('알림 도착 ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
    console.log('알림', notificationTitle, notificationOptions);
    if (Notification.permission === 'granted') {
      new Notification(notificationTitle, notificationOptions);
    }
  });
};
