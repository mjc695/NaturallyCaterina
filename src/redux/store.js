import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import blogSlice from './blogSlice'

export default configureStore({
    reducer: {
        // loginSlice,
        blog:blogSlice,
    }
})