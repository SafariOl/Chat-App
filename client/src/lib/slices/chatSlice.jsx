import { createSlice } from "@reduxjs/toolkit";
import { addChat, getChats, removeChat } from "../thunks/chatThunk";


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        chats: null,
        error: null,
        currentChatWith: ""
    },
    reducers: {
        currentChatWith: (state, action) => {
            state.currentChatWith = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(addChat.pending, state => {state.loading = true})
        builder.addCase(addChat.fulfilled, (state, action) => {
            state.loading = false
            state.chats = action.payload
        })
        builder.addCase(addChat.rejected, state => {
            state.loading = false
            state.error = "Can't add a new chat or it's already exist"
        })

        ///////////////

        builder.addCase(getChats.pending, state => {state.loading = true})
        builder.addCase(getChats.fulfilled, (state, action) => {
            state.loading = false
            state.chats = action.payload
        })
        builder.addCase(getChats.rejected, state => {
            state.loading = false
            state.error = "Can't get chats"
        })

        ////////////////

        builder.addCase(removeChat.pending, state => {state.loading = true})
        builder.addCase(removeChat.fulfilled, (state, action) => {
            state.loading = false
            state.chats = action.payload
        })
        builder.addCase(removeChat.rejected, state => {
            state.loading = false
            state.error = "Can't remove chat or it's doesn't exist"
        })        
    }
})

export default chatSlice.reducer
export const {currentChatWith} = chatSlice.actions