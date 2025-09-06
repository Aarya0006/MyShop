// src/pages/Login.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  // --- CHANGE 1: State is now for 'username' instead of 'email' ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // --- CHANGE 2: We pass the 'username' to the login function ---
      await login(username, password);
    } catch (err) {
      alert("Login failed. Check credentials or backend.");
      console.error(err);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="form-container">
          <h3 className="mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* --- CHANGE 3: The input field now asks for a Username --- */}
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}