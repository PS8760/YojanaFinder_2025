// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCcDXPJrnp9uL9LDwv95BEAvBgy4rycC_M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "yojana-527ea.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "yojana-527ea",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "yojana-527ea.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "262280638660",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:262280638660:web:e7c3661171a779b8089991",
  measurementId: "G-MNEE933JJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication service
export const auth = getAuth(app);

// Initialize and export Firestore database service
export const db = getFirestore(app);

// Initialize and export authentication providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
