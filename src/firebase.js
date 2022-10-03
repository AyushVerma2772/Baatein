// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOGYNZUvSGEKi533PBTEovXb5y-3QB58A",
  authDomain: "baatein-chats.firebaseapp.com",
  projectId: "baatein-chats",
  storageBucket: "baatein-chats.appspot.com",
  messagingSenderId: "241785421122",
  appId: "1:241785421122:web:a8757af0557e48ebbd5cdb"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

