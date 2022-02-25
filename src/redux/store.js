import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit'
// import { persistStore,persistReducer, FL } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

import loginSlice from './loginSlice'
import blogSlice from './blogSlice'


const store = configureStore({
    reducer: {
        user:loginSlice,
        blog:blogSlice,
    }
})

export default store
