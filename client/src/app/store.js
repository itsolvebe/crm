import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import { authApi } from "./services/auth/authService";
import chatReducer from "../features/chat/chatSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    modal: modalReducer,
    chat: chatReducer,
    ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
