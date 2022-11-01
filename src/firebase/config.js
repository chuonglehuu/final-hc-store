// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyAb1EDY7RX36XBpUQIsOXq0Ff2N9lDhG5M",
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,

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
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, app, storage };
