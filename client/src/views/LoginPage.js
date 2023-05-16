import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../actions/userActions";
import { Navigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };
    // dispatch(loginUser(userData));
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
