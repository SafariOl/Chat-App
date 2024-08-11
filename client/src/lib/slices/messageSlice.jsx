import { createSlice } from "@reduxjs/toolkit";
import { getChatMessages, sendMessage } from "../thunks/messageThunk";

const MessageSlice = createSlice({
    name: 'message',
    initialState: {
        loading: false,
        messages: null,
        error: null
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages?.unshift(action.payload);
        }
    },
    extraReducers: builder => {
        builder.addCase(getChatMessages.pending, state => {state.loading = true})
        builder.addCase(getChatMessages.fulfilled, (state, action) => {
            state.loading = false
            state.messages = action.payload
        })
        builder.addCase(getChatMessages.rejected, state => {
            state.loading = false
            state.error = "Can't get the chat info"
        })

        builder.addCase(sendMessage.pending, state => {state.loading = true})
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false
            state.messages = action.payload
        })
        builder.addCase(sendMessage.rejected, state => {
            state.loading = false
            state.error = "Can't get the chat info"
        })
    }
})

export const { addMessage } = MessageSlice.actions;
export default MessageSlice.reducer