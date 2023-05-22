import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "http://localhost:4000";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    createTicketStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createTicketSuccess(state) {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    createTicketFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { createTicketStart, createTicketSuccess, createTicketFailure } =
  ticketSlice.actions;

export const createTicket = (ticketData) => async (dispatch) => {
  dispatch(createTicketStart());
  try {
    const { clientId, subject, description, files, deadline, service, budget } =
      ticketData;

    const formData = new FormData();
    formData.append("clientId", clientId);
    formData.append("subject", subject);
    formData.append("deadline", deadline);
    formData.append("service", service);
    formData.append("budget", budget);
    formData.append("description", description);
    formData.append("files", files);

    console.log("final data=>>>", ticketData);
    await axios.post(`${backendURL}/api/tickets`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createTicketSuccess());
  } catch (error) {
    dispatch(createTicketFailure(error.message));
  }
};

export default ticketSlice.reducer;
