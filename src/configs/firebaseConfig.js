// Import the functions you need from the SDKs you need

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const requiredEnvVars = [
  'EXPO_PUBLIC_FIREBASE_apiKey',
  'EXPO_PUBLIC_FIREBASE_authDomain',
  'EXPO_PUBLIC_FIREBASE_projectId',
  'EXPO_PUBLIC_FIREBASE_storageBucket',
  'EXPO_PUBLIC_FIREBASE_messagingSenderId',
  'EXPO_PUBLIC_FIREBASE_appId',
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Firebase environment variables: ${missingEnvVars.join(', ')}\n` +
    'Please configure them in your .env file.'
  );
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_measurementId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const fireStoreDb = getFirestore(app);

export { app, fireStoreDb, firebaseAuth };
