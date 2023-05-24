import authReducer from "../features/auth/authSlice";
import { authApi } from "./services/auth/authService";
import chatReducer from "../features/chat/chatSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    chat: chatReducer,
    ticket: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
