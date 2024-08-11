import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../api";

export const getChatMessages = createAsyncThunk('/src/getChat', async(chatId) => {
    const res = await axios.get(`${API_KEY}/chats/get-chat/${chatId}`)
    return res.data
})

export const sendMessage = createAsyncThunk('/src/sendMessage', async(messageInfo) => {
    const res = await axios.post(`${API_KEY}/chats/send-message`, {...messageInfo})
    return res.data
})