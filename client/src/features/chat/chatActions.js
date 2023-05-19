// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const backendURL = "http://localhost:4000";
// // const backendURL = 'http://127.0.0.1:5000'

// export const userLogin = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         `${backendURL}/api/user/login`,
//         { email, password },
//         config
//       );

//       // store user's token in local storage
//       localStorage.setItem("userToken", data.userToken);

//       return data;
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "user/register",
//   async ({ firstName, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       await axios.post(
//         `${backendURL}/api/user/register`,
//         { firstName, email, password },
//         config
//       );
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );


import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { setChatMessages, addChatMessage, updateChatMessage, deleteChatMessage } from './chatSlice';

const backendURL = "http://localhost:4000";

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (payload, thunkAPI) => {
    const { sender, receiver } = payload;
    try {
      // const response = await axios.get(`/api/chat/${sender}/${receiver}`);
      const response = await axios.get(`${backendURL}/api/chat/message/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch chat messages');
    }
  }
);

export const createChatMessages = createAsyncThunk(
  'chat/createChatMessage',
  async (payload, thunkAPI) => {
    const { sender, receiver, content } = payload;
    try {
      const response = await axios.post(`${backendURL}/api/chat/message/create`, { sender, receiver, content });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to create chat message');
    }
  }
);

export const updateChatMessages = createAsyncThunk(
  'chat/updateChatMessage',
  async (payload, thunkAPI) => {
    const { chatId, messageId, content } = payload;
    try {
      const response = await axios.put(`${backendURL}/api/chat/message/get`, { chatId, messageId, content });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update chat message');
    }
  }
);

export const deleteChatMessages = createAsyncThunk(
  'chat/deleteChatMessage',
  async (payload, thunkAPI) => {
    const { chatId, messageId } = payload;
    try {
      // const response = await axios.delete(`/api/chat/${chatId}/${messageId}`);
      const response = await axios.delete(`${backendURL}/api/chat/message/delete`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete chat message');
    }
  }
);

