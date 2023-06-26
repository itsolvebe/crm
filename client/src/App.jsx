import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Router,
} from "react-router-dom";
import DashboardLayout from "layouts/dashboard";
import ProtectedRoute from "./routing/ProtectedRoute";
import Signin from "views/account/Signin";
import Signup from "views/account/Signup";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import RegisterScreen from "screens/RegisterScreen";
import Header from "components/Header/Header";
import { useDispatch } from "react-redux";
import { useGetDetailsQuery } from "app/services/auth/authService";
import { setCredentials } from "features/auth/authSlice";
import ChatLayout from "views/user/chat/ChatLayout";

import ChatMessagesLayout from "views/user/chat/ChatMessagesLayout";
import Chat from "views/admin/chat/Chat";
import TicketChats from "views/admin/chat/TicketChats";
const App = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    console.log("onload", data);
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<HomeScreen />} /> */}
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard/*" element={<DashboardLayout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
