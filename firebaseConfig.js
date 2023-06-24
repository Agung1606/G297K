// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVyuFCiBWEqZGL7EQMQWIdRYWULOks3uc",
  authDomain: "g297k-dd26d.firebaseapp.com",
  projectId: "g297k-dd26d",
  storageBucket: "g297k-dd26d.appspot.com",
  messagingSenderId: "815240593498",
  appId: "1:815240593498:web:9612cdb67e2751815cd863",
  measurementId: "G-EQNY4Y0VJX",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
