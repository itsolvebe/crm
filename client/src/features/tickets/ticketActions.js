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
      const responseFromTicket = await axios.post(
        `${backendURL}/api/tickets`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("responseFromTicket : from api ", responseFromTicket);

      const responseFromChat = await axios.post(
        `${backendURL}/api/chat/message/create`,
        {
          ticketId: responseFromTicket.data._id,
          clientId: clientId,
          ticketDetails: responseFromTicket.data,
          isSocket: false,
        }
      );
      console.log("responseFromChat : from api ", responseFromChat);

      if (responseFromChat) {
        return responseFromTicket.data;
      }

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

export const addMembers = createAsyncThunk(
  "ticket/addmembers",
  async (ticketData, { rejectWithValue }) => {
    try {
      console.log("final data=>>>", ticketData);
      const { data } = await axios.patch(
        `${backendURL}/api/tickets/addmembers/${ticketData.ticketId}`,
        { membId: ticketData.membId }
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

export const getAllTickets = createAsyncThunk(
  "ticket/alltickets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/tickets`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);
