import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../api";

export const addChat = createAsyncThunk('/src/addChat', async(chatInfo) => {
    const res = await axios.post(`${API_KEY}/chats/add-chat`, {...chatInfo})
    return res.data
})

export const getChats = createAsyncThunk('/src/getChats', async(username) =>{
    const res = await axios.get(`${API_KEY}/chats/get-chats/${username}`)
    return res.data
})

export const removeChat = createAsyncThunk('/src/removeChat', async(removeInfo) => {
    const res = await axios.delete(`${API_KEY}/chats/remove-chat/${removeInfo.chatId}/${removeInfo.username}`)
    return res.data
})