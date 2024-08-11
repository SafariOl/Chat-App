import { createSlice } from "@reduxjs/toolkit";
import { authLogin, getUsers } from "../thunks/authThunk";

const authSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false, 
        error: null,
        user: null,
        users: []
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authLogin.pending, state => {state.loading = true})
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        })
        builder.addCase(authLogin.rejected, state => {
            state.loading = false
            state.error = "Something went wrong"
        })

        builder.addCase(getUsers.pending, state => {state.loading = true})
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.filter(acc => acc.username != state.user.username)
        })
        builder.addCase(getUsers.rejected, state => {
            state.loading = false
            state.error = "Something went wrong"
        })
    }
})

export default authSlice.reducer
export const {filterUser} = authSlice.actions