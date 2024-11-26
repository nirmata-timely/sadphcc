// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChWyGVl-9nti1feqXwA8QKS07D89LIYZw",
  authDomain: "timely-c7678.firebaseapp.com",
  projectId: "timely-c7678",
  storageBucket: "timely-c7678.appspot.com",
  messagingSenderId: "431769958507",
  appId: "1:431769958507:web:fcfe576a72653738c2992e",
  measurementId: "G-JZ1BK3PT4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
