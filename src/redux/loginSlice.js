import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { userSignIn, userSignOut } from '../firebase/firebase.utils'

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
     console.log('type of response:', response.user)
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
        await userSignOut
    } catch(err) {
        console.log(err)
    }
 })

 const loginSlice = createSlice({
     name : 'user',
     initialState,
     reducers:{
         newAccount(state,action) {
             const user = action.payload
             console.log('state', state)
             state[user].userInfo=user
         },
         loginUser(state,action){
             const user = action.payload
             state[user].userInfo = user
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
         // case for log out
         .addCase(logoutUser.pending,(state,action)=>{
             state.user.status = 'loading'
             console.log('loading')
         })
         .addCase(logoutUser.fulfilled, (state,action)=>{
             state.user.status = 'idle'
             state.user.loggedIn = false
             state.user.userInfo=initialUserInfo
             console.log('successful')
         })
         .addCase(logoutUser.rejected,(state,payload)=>{
             console.log('attempt rejected', payload)
         })
     }
 })

 export const {newAccount, loginUser} = loginSlice.actions

 export default loginSlice.reducer