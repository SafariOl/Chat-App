import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_KEY } from "../api";

export const authLogin = createAsyncThunk("/src/authSlice", async(userInfo) => {
    const res = await axios.post(`${API_KEY}/users/login`, {...userInfo})   
    return res.data
})

export const getUsers = createAsyncThunk('/src/getUsers', async() => {
    const res = await axios.get(`${API_KEY}/users`)
    return res.data
})