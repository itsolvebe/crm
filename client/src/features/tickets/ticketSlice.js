import { createSlice } from "@reduxjs/toolkit";
import {
  createTicket,
  getClientTickets,
  getAllTickets,
  addMembers,
  getMembersTickets,
} from "./ticketActions";

const initialState = {
  loading: false,
  ticketInfo: [],
  membersTickets: [],
  allTickets: [],
  error: null,
  success: false,
  modalIsOpen: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
  },
  extraReducers: {
    // login user
    [getClientTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getClientTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.ticketInfo = payload;
    },
    [getClientTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [getAllTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allTickets = payload;
    },
    [getAllTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [createTicket.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTicket.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.modalIsOpen = false;
    },
    [createTicket.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addMembers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addMembers.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
      state.modalIsOpen = false;
    },
    [addMembers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getMembersTickets.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getMembersTickets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.membersTickets = payload;
    },
    [getMembersTickets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { openModal, closeModal } = ticketSlice.actions;

export default ticketSlice.reducer;
