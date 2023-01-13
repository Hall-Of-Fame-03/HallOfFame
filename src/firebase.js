// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlEOgAYe49rmcTH6ToLdTK00C5riZyHc0",
  authDomain: "hall-of-fame-03.firebaseapp.com",
  projectId: "hall-of-fame-03",
  storageBucket: "hall-of-fame-03.appspot.com",
  messagingSenderId: "531424768163",
  appId: "1:531424768163:web:25ff38487bc60f2b138f16",
  measurementId: "G-F5472FJ1N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);