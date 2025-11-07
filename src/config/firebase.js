// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO8LyLAbhPu61ui7dkQxn3mblEqOevvgE",
  authDomain: "vite-contact-5614f.firebaseapp.com",
  projectId: "vite-contact-5614f",
  storageBucket: "vite-contact-5614f.firebasestorage.app",
  messagingSenderId: "66222214359",
  appId: "1:66222214359:web:951fb8ece058087e9f3492"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)