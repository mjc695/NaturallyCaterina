import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import {getDocs, collection} from 'firebase/firestore'
import db, { fetchBlogs } from '../firebase/firebase.utils'

const initialState = {
    status: 'idle',
    blogList: []
} //array of blogposts from firebase

export const fetchAllBlogs = createAsyncThunk('blog/fetchAllBlogs', async()=>{
    const response = await fetchBlogs()
    console.log('response in blog slice', response)
    return response
})

const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers: {
        // allBlogs(state, action){
        //     const blogList=
        //     state.blog.blog=blogList
        // }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchAllBlogs.pending, (state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllBlogs.fulfilled, (state,action)=>{
            state.status='idle'
            state.blogList = action.payload
        })
        .addCase(fetchAllBlogs.rejected,(state,payload)=>{
            console.log('rejected', payload)
        })
    }
})

export default blogSlice.reducer