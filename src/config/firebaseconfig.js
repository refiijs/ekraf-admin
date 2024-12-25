// src/config/firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqvj8-OdHj7Wyl4PqRn9NT8zpIQ29bbLk",
  authDomain: "ekraf-ta2.firebaseapp.com",
  projectId: "ekraf-ta2",
  storageBucket: "ekraf-ta2.appspot.com",
  messagingSenderId: "513103630047",
  appId: "1:513103630047:web:42e542e6b9e5699030636a",
  measurementId: "G-0YS00XH8PZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, collection, getDocs };
