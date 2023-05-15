import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { registerUser } from "../actions/userActions";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = { name, email, password, role };
    // dispatch(registerUser(userData));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Ticket Manager">Ticket Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
