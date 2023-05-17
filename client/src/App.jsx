import React from "react";
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
const App = () => {
  return (
    <BrowserRouter>
      {/* <Header />   Dont Remove */}
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