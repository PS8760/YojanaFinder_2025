// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcDXPJrnp9uL9LDwv95BEAvBgy4rycC_M",
  authDomain: "yojana-527ea.firebaseapp.com",
  projectId: "yojana-527ea",
  storageBucket: "yojana-527ea.firebasestorage.app",
  messagingSenderId: "262280638660",
  appId: "1:262280638660:web:e7c3661171a779b8089991",
  measurementId: "G-MNEE933JJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication service
export const auth = getAuth(app);

// Initialize and export Firestore database service
export const db = getFirestore(app);
