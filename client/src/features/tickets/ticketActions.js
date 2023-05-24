import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:4000";

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData, { rejectWithValue }) => {
    try {
      const {
        clientId,
        subject,
        description,
        files,
        deadline,
        service,
        budget,
      } = ticketData;

      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("subject", subject);
      formData.append("deadline", deadline);
      formData.append("service", service);
      formData.append("budget", budget);
      formData.append("description", description);
      formData.append("files", files[0]);

      // console.log("final data=>>>", formData);
      await axios.post(`${backendURL}/api/tickets`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //   dispatch(closeModal());
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getClientTickets = createAsyncThunk(
  "ticket/getclientticket",
  async (clientId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/tickets/client/${clientId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
