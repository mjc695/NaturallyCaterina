import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit'
// import { persistStore,persistReducer, FL } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

import loginSlice from './loginSlice'


const store = configureStore({
    reducer: {
        user: loginSlice
    },
})

const persistConfig={
    key: 'root',
    storage: storage,
    // blacklist: ['user']
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const store = createStore(persistedReducer)
// console.log('persisted reducer working')
// export const persistor = persistStore(store)

export default store