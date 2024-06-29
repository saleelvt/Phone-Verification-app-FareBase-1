
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz17cl5mmLp-NEI4O0U8WCp7cg9D-e-Po",
  authDomain: "loginpage-c1f69.firebaseapp.com",
  projectId: "loginpage-c1f69",
  storageBucket: "loginpage-c1f69.appspot.com",
  messagingSenderId: "5804747620",
  appId: "1:5804747620:web:3f508f3f01173fcddbe871",
  measurementId: "G-4FQDLJ9S12"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
