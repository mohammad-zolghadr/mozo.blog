import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtlYzZl8NB4VNPYcbGrPaSPdgJVHe6fdQ",
  authDomain: "blog-project-916.firebaseapp.com",
  projectId: "blog-project-916",
  storageBucket: "blog-project-916.appspot.com",
  messagingSenderId: "919255241287",
  appId: "1:919255241287:web:b8b79043c182e07aa4d762",
  measurementId: "G-QPSG37S8ST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
