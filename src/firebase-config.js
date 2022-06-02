import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI0xSQVuUNsYpuEQOS4UsTU5WKBh5HVf4",
  authDomain: "sailmore-e2cfc.firebaseapp.com",
  projectId: "sailmore-e2cfc",
  storageBucket: "sailmore-e2cfc.appspot.com",
  messagingSenderId: "1028841883713",
  appId: "1:1028841883713:web:de3f463e07d25120045ec0",
  measurementId: "G-WHJLTP0569"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const usersRef = collection(db, "users"); 
export const gasterRef = collection(db, "gaster"); 
export const postsRef = collection(db, "posts"); 
export const favsRef = collection(db, "favorites");

