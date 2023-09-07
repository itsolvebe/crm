import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { setChatMessages, addChatMessage, updateChatMessage, deleteChatMessage } from './chatSlice';

const backendURL = "https://booming-spectrum-melon.glitch.me/api";

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (payload, thunkAPI) => {
    const { ticketId } = payload;
    console.log("sender: <", payload);
    try {
      // const response = await axios.get(`/api/chat/${sender}/${receiver}`);
      const response = await axios.post(`${backendURL}/chat/message/get`, {
        ticketId,
      });
      console.log("response : from api ", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch chat messages");
    }
  }
);

export const createChatMessages = createAsyncThunk(
  "chat/createChatMessage",
  async (payload, thunkAPI) => {
    const { sender, receiver, content } = payload;
    try {
      const response = await axios.post(`${backendURL}/chat/message/create`, {
        sender,
        receiver,
        content,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create chat message");
    }
  }
);

export const updateChatMessages = createAsyncThunk(
  "chat/updateChatMessage",
  async (payload, thunkAPI) => {
    const { chatId, messageId, content } = payload;
    try {
      const response = await axios.put(`${backendURL}/chat/message/get`, {
        chatId,
        messageId,
        content,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update chat message");
    }
  }
);

export const deleteChatMessages = createAsyncThunk(
  "chat/deleteChatMessage",
  async (payload, thunkAPI) => {
    const { chatId, messageId } = payload;
    try {
      // const response = await axios.delete(`/api/chat/${chatId}/${messageId}`);
      const response = await axios.delete(`${backendURL}/chat/message/delete`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete chat message");
    }
  }
);
