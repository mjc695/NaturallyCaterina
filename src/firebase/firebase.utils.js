// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getDocs, doc, collection, getFirestore, getDoc } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithCustomToken,signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
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
    } catch(err){
        console.log(err.code)
        console.log(err.message)
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

// fetching blogs
export const fetchBlogs = async () => {
    const docRef = collection(db,'blog')
    const response = await getDocs(docRef)
    let blogArr = []
    response.forEach((doc) =>{
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
       blogArr.push({
           title: [doc.data().title],
           text: doc.data().text
        })
    })
    return blogArr
}

// export const fetchBlog = async (id) =>{
//     const docRef = doc(db, 'blog', `${id}`)
//     const response = await getDoc(docRef)
//     console.log('doc in utils', response.exists())
// }


export default db
