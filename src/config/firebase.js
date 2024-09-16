import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfz7yMNAOQYK2vIdCGeJ22OmQ3Cq5wsFI",
  authDomain: "hospitalms-5b402.firebaseapp.com",
  projectId: "hospitalms-5b402",
  storageBucket: "hospitalms-5b402.appspot.com",
  messagingSenderId: "81101780621",
  appId: "1:81101780621:web:768948439d7b35e84d54c4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)
export const storage = getStorage(app)