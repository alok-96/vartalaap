import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD78kUsJJS6llZSM6z4cjJHDbUnabHfW-Y",
  authDomain: "alok-s-chat-app.firebaseapp.com",
  projectId: "alok-s-chat-app",
  storageBucket: "alok-s-chat-app.appspot.com",
  messagingSenderId: "896862932335",
  appId: "1:896862932335:web:c0c4a2736308828f58ec9a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
