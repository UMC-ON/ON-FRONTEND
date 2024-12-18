import { getToken, getMessaging } from 'firebase/messaging';
import { postData } from '../api/Functions';
import { registerServiceWorker } from './registerServiceWorker';
import { POST_TOKEN } from '../api/urls';
import { initializeApp } from 'firebase/app';

export async function handleAllowNotification() {
  registerServiceWorker();

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);
  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      alert(token);
      if (token) {
        console.log('토큰', token);
        try {
          const response = await postData(
            POST_TOKEN,
            {
              deviceToken: token,
            },
            {
              Authorization: `Bearer ${localStorage.getItem('AToken')}`,
              'Content-Type': 'application/json',
            },
          );

          if (response) {
            console.log('토큰 보내짐:', response.data);
          } else {
            console.error('토큰 보내지 않음');
          }
        } catch (error) {
          console.error('토큰 보내는 중 에러 발생', error);
        }
      } else {
        alert('토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요');
      }
    } else if (permission === 'denied') {
      alert(permission);
      alert(
        'web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요',
      );
    }
  } catch (error) {
    console.error('푸시 토큰 가져오는 중에 에러 발생', error);
  }
}

export function requestNotificationPermissionOnce() {
  const notificationAsked = localStorage.getItem('notificationAsked');

  // 알림 권한을 요청한 적이 없으면
  // if (!notificationAsked) {
  handleAllowNotification();
  // 알림 권한 요청을 한 번 했음을 저장
  localStorage.setItem('notificationAsked', 'true');
  // }
  console.log('noti', notificationAsked);
}
