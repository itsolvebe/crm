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
  async (
    { firstName, lastName, email, password, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, lastName, email, password, phoneNumber },
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

export const getAllUsers = createAsyncThunk(
  "user/getallusers",
  async (_, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(`${backendURL}/api/user`, config);
      console.log("++++++++++++++++++++++++++++++", data);
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

export const updateUser = createAsyncThunk(
  "user/update",
  async (updatedInfo, { rejectWithValue }) => {
    try {
      const {
        email,
        phoneNumber,
        designation,
        company,
        address,
        nationality,
        role,
        avatar,
      } = updatedInfo;
      const updatedData = new FormData();
      updatedData.append("email", email);
      updatedData.append("phoneNumber", phoneNumber);
      updatedData.append("designation", designation);
      updatedData.append("company", company);
      updatedData.append("address", address);
      updatedData.append("nationality", nationality);
      updatedData.append("role", role);
      updatedData.append("picture", avatar);
      console.log("ACTION", updatedInfo);
      console.log("updtAction", avatar);
      await axios.patch(
        `${backendURL}/api/user/update/${updatedInfo._id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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

export const updateUserRole = createAsyncThunk(
  "user/roleupdate",
  async (updatedInfo, { rejectWithValue }) => {
    try {
      const { _id, role } = updatedInfo;
      const updatedData = new FormData();
      updatedData.append("role", role);
      console.log("ACTION", updatedInfo);

      await axios.patch(`${backendURL}/api/user/update/${_id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userDelete = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendURL}/api/user/delete/${id}`,
        config
      );

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
