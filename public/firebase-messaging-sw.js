importScripts(
  'https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyAA06_MAwUKfVwtAnih_q0NSnIM0G8Op0Q',
  authDomain: 'oncommunity-f3dad.firebaseapp.com',
  projectId: 'oncommunity-f3dad',
  storageBucket: 'oncommunity-f3dad.appspot.com',
  messagingSenderId: '127863478997',
  appId: '1:127863478997:web:f922de330e110844e2605c',
  measurementId: 'G-CHKYD0GWJ7',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('install', function (e) {
  console.log('fcm sw install..', e);
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..', e);
});

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  console.log(resultData);
  const formatTitle = resultData.title.replace(/^\[.*?\]\s*/, '');
  const notificationTitle = formatTitle;
  const notificationOptions = {
    body: resultData.body,
    icon: '/icon/favicon-96x96.png',
  };
  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = 'payload.title';
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('notificationclick', function (event) {
//   console.log('notification click');
//   const url = '/';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
