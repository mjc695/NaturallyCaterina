// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage(app)

const auth = getAuth()

// create account

export const userSignUp = async (email, password) =>{
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // add user credentials to redux
        console.log('signing UP')
        return userCredential

    } catch (error){
        console.log(error.code)
        console.log(error.message)
    }
}

export const userSignIn = async (email,password) =>{
    try{
        console.log('signing In', email, password)
        // console.log('password:', password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential
    } catch(error){
        console.log(error.code)
        console.log(error.message)
    }
}

export const userSignOut = async () =>{
    try{
        return signOut(auth)
    } catch(error){
        console.log("didn't sign out", error)
    }
}


export default db