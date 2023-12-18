// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-d1fa7.firebaseapp.com",
  projectId: "mern-estate-d1fa7",
  storageBucket: "mern-estate-d1fa7.appspot.com",
  messagingSenderId: "941068645171",
  appId: "1:941068645171:web:c47cecfeb4d0b6ea4c4446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
