import React from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Router,
} from "react-router-dom";

import AdminLayout from "layouts/admin";
import UserLayout from "layouts/user";
import LoginPage from "views/LoginPage";
import RegisterPage from "views/RegisterPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "screens/ProfileScreen";
import LoadingPage from "screens/LoadingPage";

// const ProtectedRoute = ({ element: Element, role, ...rest }) => {
//   // ... (existing code for ProtectedRoute)
//   // No changes required here
// };

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" replace />} />{" "}
    //     {/* Redirect to login */}
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     <Route
    //       path="admin/*"
    //       element={<ProtectedRoute element={<AdminLayout />} role="admin" />}
    //     />
    //     <Route
    //       path="user/*"
    //       element={<ProtectedRoute element={<UserLayout />} role="user" />}
    //     />
    //     {/* Other routes */}
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      {/* <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="admin/*" element={<AdminLayout />} />

        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <AdminLayout />
            // </ProtectedRoute>
          }
        />
      </Routes> */}
      <LoadingPage />
      <Routes>
        {/* <Route path="/" element={<AdminLayout />} /> */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="admin/*" element={<AdminLayout />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
