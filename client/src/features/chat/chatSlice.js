import { createSlice } from '@reduxjs/toolkit';
import {fetchChatMessages, createChatMessages, updateChatMessages, } from './chatActions'

const initialState = {
  loading: false,
  error: null,
  chatMessages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    updateChatMessage: (state, action) => {
      const { messageId, content } = action.payload;
      const messageIndex = state.chatMessages.findIndex((message) => message._id === messageId);
      if (messageIndex !== -1) {
        state.chatMessages[messageIndex].content = content;
      }
    },
    deleteChatMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.chatMessages.findIndex((message) => message._id === messageId);
      if (messageIndex !== -1) {
        state.chatMessages.splice(messageIndex, 1);
      }
    },
  },
  extraReducers: {
    [fetchChatMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchChatMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatMessages = action.payload;
    },
    [fetchChatMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createChatMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createChatMessages.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatMessages.push(action.payload);
    },
    [createChatMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateChatMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateChatMessages.fulfilled]: (state, action) => {
      state.loading = false;
      // Update the content of the updated chat message
      const { messageId, content } = action.payload;
      const messageIndex = state.chatMessages.findIndex((message) => message._id === messageId);
      if (messageIndex !== -1) {
        state.chatMessages[messageIndex].content = content;
      }
    },
    [updateChatMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  
});

export const { setChatMessages, addChatMessage, updateChatMessage, deleteChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
