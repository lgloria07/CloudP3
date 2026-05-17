import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHcnK71yfZimpSzjXlRL0vw76iv90Ytng",
  authDomain: "cloudp3-69aa9.firebaseapp.com",
  projectId: "cloudp3-69aa9",
  storageBucket: "cloudp3-69aa9.firebasestorage.app",
  messagingSenderId: "440431335809",
  appId: "1:440431335809:web:8fba3ac9dfcf14d6b97080"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});