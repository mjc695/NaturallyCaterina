// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { doc, getDoc,setDoc, updateDoc, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithCustomToken,signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { useRouteMatch } from "react-router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage(app)

export const auth = getAuth()

const provider = new GoogleAuthProvider()

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

// subscribe to auth

export const subscribeToAuth = async () =>{
    try{
        let user = null
        await auth.onAuthStateChanged(response => {
            console.log('response in utils', response)
            user = response
        })
        return user
    } catch(error){
        console.log(error)
    }
}

// grabbing user data 

export const userDataSnapshot = async (user) =>{
    const userid = user.uid
    const docRef = doc(db, 'users', `${userid}`)
    try{
        // console.log('trying to get snapshot')
        const userData = await getDoc(docRef)
        console.log('userData', userData.exists())
        if (userData.exists()) return userData.data()
        console.log('user', user.email)

        const email = user.email
        const name = user.displayName || ''
        const displayPhotoUrl = user.photoURL || ''
        const newUserData = {
            email,
            name,
            displayPhotoUrl,
            createdAt: new Date()
        }
        console.log('email:', email, new Date())
        const newUser = await setDoc(docRef,newUserData)
        console.log('set new data', newUser)
        return docRef

    } catch(error){
        console.log(error)
    }
}

export const updateUserData = async (userData) =>{
    const {userId, name, displayPhotoUrl} = userData
    const docRef = doc(db, 'users', `${userId}`)
    try{
        console.log('typeof name', typeof name)
        const newUser = await updateDoc(docRef,{
            name: name,
            displayPhotoUrl, displayPhotoUrl
        })
    }catch(error){
        console.log(error)
    }
}


// sign in 
export const userSignIn = async (email,password) =>{
    try{
        console.log('signing In', email, password)
        // console.log('password:', password)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log('user credentials in utils:', userCredential)
        return userCredential
    } catch(error){
        console.log(error.code)
        console.log(error.message)
    }
}

//sign in with persist token
export const signInWithToken = async (token) =>{
    try{
        const userCredential = await signInWithCustomToken(auth,token)
        return userCredential
    } catch(error){
        console.log(error.code)
        console.log(error.message)
    }

}

// sign in with google
export const signInWithGoogle = async () =>{
    try{
        const result = await signInWithPopup(auth,provider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        console.log('result:', result)
        console.log('credential:', credential)
        console.log('token:', token)
        console.log('user:', user)
        return result
    } catch(error){
        console.log(error.code)
        console.log(error.message)
        console.log(error.email)
        console.log(GoogleAuthProvider.credentialFromError(error))
    }
}


export const userSignOut = async () =>{
    try{
        return auth.signOut()
    } catch(error){
        console.log("didn't sign out", error)
    }
}


export default db
