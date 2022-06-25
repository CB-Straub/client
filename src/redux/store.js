import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/authSlice'
import postReducer from './features/postSlice'


export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    }
})