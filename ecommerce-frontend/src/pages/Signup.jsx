import React, { useState } from "react";
import { signupRequest } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupRequest({ username, email, password });
      alert("Account created. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed.");
      console.error(err);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="form-container">
        <h3 className="mb-3">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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
            Signup
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
