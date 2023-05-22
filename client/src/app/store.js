import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import { authApi } from "./services/auth/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
