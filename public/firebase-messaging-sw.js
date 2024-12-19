// importScripts(
//   'https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js',
// );
// importScripts(
//   'https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js',
// );

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { onBackgroundMessage } from 'firebase/messaging/sw';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed', e);
});

// activate event
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] actived', e);
});

// fetch event
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url);
});
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAA06_MAwUKfVwtAnih_q0NSnIM0G8Op0Q',
  authDomain: 'oncommunity-f3dad.firebaseapp.com',
  projectId: 'oncommunity-f3dad',
  storageBucket: 'oncommunity-f3dad.firebasestorage.app',
  messagingSenderId: '127863478997',
  appId: '1:127863478997:web:f922de330e110844e2605c',
  measurementId: 'G-CHKYD0GWJ7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions),
  );
});

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// firebase.initializeApp({
//   apiKey: 'AIzaSyAA06_MAwUKfVwtAnih_q0NSnIM0G8Op0Q',
//   authDomain: 'oncommunity-f3dad.firebaseapp.com',
//   projectId: 'oncommunity-f3dad',
//   storageBucket: 'oncommunity-f3dad.appspot.com',
//   messagingSenderId: '127863478997',
//   appId: '1:127863478997:web:f922de330e110844e2605c',
//   measurementId: 'G-CHKYD0GWJ7',
// });

// // Firebase Messaging 설정
// const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage(messaging, function (payload) {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.title;
//   const notificationOptions = {
//     body: payload.body,
//     // icon: payload.icon
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener('install', function (e) {
//   console.log('fcm sw install..');
//   self.skipWaiting();
// });

// self.addEventListener('activate', function (e) {
//   console.log('fcm sw activate..');
// });

// self.addEventListener('notificationclick', function (event) {
//   console.log('notification click');
//   const url = '/';
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });
