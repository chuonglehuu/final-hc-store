// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1EDY7RX36XBpUQIsOXq0Ff2N9lDhG5M",
  authDomain: "hc-store-75829.firebaseapp.com",
  databaseURL:
    "https://hc-store-75829-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hc-store-75829",
  storageBucket: "hc-store-75829.appspot.com",
  messagingSenderId: "719242039093",
  appId: "1:719242039093:web:e2c500655e26554898067c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
