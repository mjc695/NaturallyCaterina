// Import the functions you need from the SDKs you need
// import firebase, { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getDocs, doc, collection, getFirestore, getDoc } from 'firebase/firestore'
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
        return userSignUp

    } catch (error){
        console.log(error.code)
        console.log(error.message)
    }
}

export const userSignIn = async (email,password) =>{
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log('signing In')
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