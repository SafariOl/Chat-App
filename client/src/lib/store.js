import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import chatSlice from './slices/chatSlice'
import messageSlice from './slices/messageSlice'

export const store = configureStore({
    reducer: {
        users: authSlice,
        chat: chatSlice,
        message: messageSlice
    }
})