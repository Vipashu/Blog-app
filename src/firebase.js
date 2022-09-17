import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBT6eXTXzhf2SeZrBg2jHAAEC-q6mh4QuU",
  authDomain: "blog-app-e183f.firebaseapp.com",
  projectId: "blog-app-e183f",
  storageBucket: "blog-app-e183f.appspot.com",
  messagingSenderId: "869027273681",
  appId: "1:869027273681:web:6473845369b48b11d0def0",
  measurementId: "G-PX72HCH1GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);