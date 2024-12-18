// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
