import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit'
// import { setAccessToken } from 'firebase-tools/lib/api'
import { userSignIn, userSignOut, signInWithToken, signInWithGoogle, auth, subscribeToAuth } from '../firebase/firebase.utils'


const initialUserInfo = { name: '', email : '', accessToken: '', photoURL: '', displayName:'', userId:''}

 const initialState = {
     user:{
         status: 'idle',
         loggedIn: false,
         userInfo: initialUserInfo
    }
 }

 export const fetchUser = createAsyncThunk('user/fetchUser', async({email,password})=>{
    //  console.log('in thunk', email, typeof  password)
     const response = await userSignIn(email,password)
    //  console.log('type of response:', response.user)
     const user = response.user
     const newUser = {
         email: user.email,
         accessToken: user.accessToken,
         photoUrl: user.photoURL,
         displayName : user.displayName,
         userId: user.uid,
         name: user.name
        }
        // cookies.set('authToken', user.accessToken)
     return newUser
 })

 export const fetchAuthStatus = createAsyncThunk('user/fetchAuthStatus', async()=>{
     const user = await subscribeToAuth()
    //  console.log('response in slice fetching auth', user)
    //  const user = response.user
     const newUser = {
        email: user.email,
        accessToken: user.accessToken,
        photoUrl: user.photoURL,
        displayName : user.displayName,
        userId: user.uid,
        name: user.name
     }
    //  console.log('new user in fetching auth status:', newUser)
     return newUser
 })

 export const fetchUserWithToken = createAsyncThunk('user/fetchUserWithToken', async(token)=>{
     const response = await signInWithToken(token)
     const user = response.user
     const newUser = {
        email: user.email,
        accessToken: user.accessToken,
        photoUrl: user.photoURL,
        displayName : user.displayName,
        userId: user.uid,
        name: user.name
     }
     return newUser
 })

 export const logoutUser = createAsyncThunk('user/logoutUser', async()=>{
    try{
        await userSignOut()
    } catch(err) {
        console.log(err)
    }
 })

 export const fetchUserWithGoogleAuth = createAsyncThunk('user/fetchUserWithGoogleAuth', async()=>{
     try{
         console.log('registering click')
        const response = await signInWithGoogle()
        const user = response.user
        console.log('user in redux:', user)
        const newUser = {
            email: user.email,
            accessToken: user.accessToken,
            photoUrl: user.photoURL,
            displayName : user.displayName,
            userId: user.uid,
            name: user.name
         }
         return newUser
     }catch(error){
         console.log(error)
     }
 })

 const loginSlice = createSlice({
     name : 'user',
     initialState,
     reducers:{
         newAccount(state,action) {
             const user = action.payload
            //  console.log('state', state)
             state[user].userInfo=user
         },
         logInUser(state,action){
            //  console.log('being called in reducer')
             const user = action.payload.response
             const newUser = {
                email: user.email,
                accessToken: user.accessToken,
                photoUrl: user.photoURL,
                displayName : user.displayName,
                userId: user.uid,
                name: user.name
             }
             state[user].userInfo = user
             return newUser
         },
     }, 
     extraReducers: builder => {
         builder
         .addCase(fetchUser.pending, (state,action) =>{
             state.user.status = 'loading'
         })
         .addCase(fetchUser.fulfilled,(state,action) =>{
            state.user.status='idle'
            state.user.loggedIn=true
            state.user.userInfo=action.payload
         })
         .addCase(fetchUser.rejected,(state,payload)=>{
             console.log('attempt rejected', payload)
         })
         // auth user subscription
         .addCase(fetchAuthStatus.pending, (state,action) =>{
             state.user.status = 'loading'
         })
         .addCase(fetchAuthStatus.fulfilled,(state,action) =>{
            state.user.status='idle'
            state.user.loggedIn=true
            state.user.userInfo=action.payload
         })
         .addCase(fetchAuthStatus.rejected,(state,payload)=>{
             console.log('attempt rejected', state, payload)
         })

         // case for login w/ token
        //  .addCase(fetchUserWithToken.pending, (state,action)=>{
        //      state.user.status='loading'
        //  })
        //  .addCase(fetchUserWithToken.fulfilled,(state,action)=>{
        //      state.user.status='idle'
        //      state.user.loggedIn=true
        //      state.user.userInfo=action.payload
        //  })
        //  .addCase(fetchUserWithToken.rejected,(state,payload)=>{
        //      console.log('attempt rejected'. payload)
        //  })
         // case for login w/ google auth
         .addCase(fetchUserWithGoogleAuth.pending, (state,action)=>{
            state.user.status='loading'
         })
         .addCase(fetchUserWithGoogleAuth.fulfilled,(state,action)=>{
            state.user.userInfo=action.payload
            state.user.status='idle'
            if (state.user.userInfo) state.user.loggedIn=true
        })
        .addCase(fetchUserWithGoogleAuth.rejected,(state,payload)=>{
            console.log('attempt rejected'. payload)
        })


         // case for log out
         .addCase(logoutUser.pending,(state,action)=>{
             state.user.status = 'loading'
            //  console.log('loading')
         })
         .addCase(logoutUser.fulfilled, (state,action)=>{
             state.user.status = 'idle'
             state.user.loggedIn = false
             state.user.userInfo=initialUserInfo
            //  console.log('successful')
         })
         .addCase(logoutUser.rejected,(state,payload)=>{
             console.log('attempt rejected', payload)
         })
     }
 })

 export const {newAccount, logInUser} = loginSlice.actions

 export default loginSlice.reducer