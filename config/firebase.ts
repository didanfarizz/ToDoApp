// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Fn-b7SgcDBhQFpQmwursW61yak5hMH0",
  authDomain: "todoapp-41392.firebaseapp.com",
  projectId: "todoapp-41392",
  storageBucket: "todoapp-41392.firebasestorage.app",
  messagingSenderId: "109529394520",
  appId: "1:109529394520:web:3189f3d5187eb19687c92d",
  measurementId: "G-GRFMQNF3PG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const FIREBASE_AUTH = getAuth(app);