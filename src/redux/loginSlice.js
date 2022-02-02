import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { userSignIn } from '../firebase/firebase.utils'

 const initialState = {
     loggedIn: false,
     userInfo: {}
 }

 export const fetchUser = createAsyncThunk('login/fetchUser', async(email,password)=>{
     const response = await userSignIn(email,password)
     return response.user
 })

 const loginSlice = createSlice({
     name : 'user',
     initialState,
     reducers:{
         newAccount(state,action) {
             const user = action.payload
             state.user[userInfo]=user
         }
     }, 
     extraReducers: builder => {
         builder
         .addCase(fetchUser.pending, (state,action) =>{
             state.status = 'loading'
         })
         .addCase(fetchuser.fulfilled,(state,action) =>{
            state.status='idle'
            state.loggedIn=true
            state.userInfo=action.payload
         })
     }
 })

 export const {newAccount} = createSlice.actions

 export default loginSlice.reducer