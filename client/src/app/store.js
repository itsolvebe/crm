import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import { authApi } from "./services/auth/authService";
import chatReducer from "../features/chat/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    modal: modalReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
