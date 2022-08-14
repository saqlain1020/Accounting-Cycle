// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3OgXcuO8xj5GDwHJRgYRg4tuBtBq2q0g",
  authDomain: "react-quiz-app-a5116.firebaseapp.com",
  databaseURL: "https://react-quiz-app-a5116.firebaseio.com",
  projectId: "react-quiz-app-a5116",
  storageBucket: "react-quiz-app-a5116.appspot.com",
  messagingSenderId: "175000509759",
  appId: "1:175000509759:web:21e43ee4d93ff249dfc78a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

enum CollectionName {
  EntryNames = "EntryNames",
  Entries = "Entries",
  AdjustingEntries = "AdjustingEntries",
}

export {
  db,
  collection,
  getDocs,
  deleteDoc,
  auth,
  orderBy,
  onAuthStateChanged,
  googleProvider,
  signInWithPopup,
  doc,
  GoogleAuthProvider,
  signOut,
  Timestamp,
  setDoc,
  query,
  where,
  CollectionName,
  addDoc,
};

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }
