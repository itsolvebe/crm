// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { closeModal } from "features/modal/modalSlice";
// const backendURL = "http://localhost:4000";

// const ticketSlice = createSlice({
//   name: "ticket",
//   initialState: {
//     loading: false,
//     error: null,
//     success: false,
//     tickets: null,
//   },
//   reducers: {
//     createTicketStart(state) {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     },
//     createTicketSuccess(state) {
//       state.loading = false;
//       state.error = null;
//       state.success = true;
//     },
//     createTicketFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.success = false;
//     },
//     getClientTicketStart(state) {
//       state.loading = true;
//       state.error = null;
//       state.success = false;
//     },
//     getClientTicketSuccess(state, action) {
//       state.loading = false;
//       state.error = null;
//       state.success = true;
//       state.tickets = action.payload;
//     },
//     getClientTicketFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//       state.success = false;
//     },
//   },
// });

// export const {
//   createTicketStart,
//   createTicketSuccess,
//   createTicketFailure,
//   getClientTicketStart,
//   getClientTicketSuccess,
//   getClientTicketFailure,
// } = ticketSlice.actions;

// export default ticketSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createTicket, getClientTickets } from "./ticketActions";

const initialState = {
  loading: false,
  ticketInfo: [],
  error: null,
  success: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem("userToken"); // delete token from storage
    //   state.loading = false;
    //   state.ticketInfo = null;
    //   state.userToken = null;
    //   state.error = null;
    // },
    // setCredentials: (state, { payload }) => {
    //   state.ticketInfo = payload;
    // },
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

    [createTicket.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTicket.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [createTicket.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

// export const { logout, setCredentials } = ticketSlice.actions;

export default ticketSlice.reducer;
