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

// export const createTicket = (ticketData) => async (dispatch) => {
//     dispatch(createTicketStart());
//     try {
//       const { clientId, subject, description, files, deadline, service, budget } =
//         ticketData;

//       const formData = new FormData();
//       formData.append("clientId", clientId);
//       formData.append("subject", subject);
//       formData.append("deadline", deadline);
//       formData.append("service", service);
//       formData.append("budget", budget);
//       formData.append("description", description);
//       formData.append("files", files[0]);

//       // console.log("final data=>>>", formData);
//       await axios.post(`${backendURL}/api/tickets`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       dispatch(createTicketSuccess());
//       dispatch(closeModal());
//     } catch (error) {
//       dispatch(createTicketFailure(error.message));
//     }
//   };

//   export const getClientTickets = (clientId) => async (dispatch) => {
//     dispatch(getClientTicketStart());
//     try {
//       // console.log("final data=>>>", clientId);
//       const res = await axios.get(
//         `${backendURL}/api/tickets/client/${clientId}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(res.data);

//       dispatch(getClientTicketSuccess(res.data));
//       dispatch(closeModal());
//       return res.data;
//     } catch (error) {
//       dispatch(getClientTicketFailure(error.message));
//     }
//   };

export const getClientTickets = createAsyncThunk(
  "ticket/getclientticket",
  async (clientId, { rejectWithValue }) => {
    try {
      // console.log("final data=>>>", clientId);
      const { data } = await axios.get(
        `${backendURL}/api/tickets/client/${clientId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);

      // dispatch(getClientTicketSuccess(res.data));
      // dispatch(closeModal());
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
