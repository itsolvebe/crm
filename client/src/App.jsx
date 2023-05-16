import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import UserLayout from "layouts/user";
import AuthLayout from "layouts/auth";
import Signin from "views/account/Signin";
import Signup from "views/account/Signup";
import ChatLayout from "views/chat/ChatLayout";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="user/*" element={<UserLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/chat" element={<ChatLayout />} />
    </Routes>
  );
};

export default App;
