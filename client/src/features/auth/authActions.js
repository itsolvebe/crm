import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:4000";
// const backendURL = 'http://127.0.0.1:5000'

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/user/login`,
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);

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

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("User token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(
        `${backendURL}/api/user/profile`,
        config
      );

      return data;
    } catch (error) {
      // If loading user fails, remove the token from local storage
      localStorage.removeItem("userToken");

      // Return the error message
      return rejectWithValue(error.message);
    }
  }
);