// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPkpisWbBaDXHwPRHpRUoWZnVaPRx8ldg",
  authDomain: "naturallycaterina.firebaseapp.com",
  databaseURL: "https://naturallycaterina-default-rtdb.firebaseio.com",
  projectId: "naturallycaterina",
  storageBucket: "naturallycaterina.appspot.com",
  messagingSenderId: "180192664831",
  appId: "1:180192664831:web:9514675c3c0e50791400ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export default db