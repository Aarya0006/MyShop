import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, getProfile } from "../services/authServices";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // interceptor already attaches token, but set default also to be safe
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      (async () => {
        try {
          const res = await getProfile();
          setUser(res.data);
        } catch (err) {
          console.error("profile fetch failed", err);
          logout();
        }
      })();
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  const login = async (username,password) => {
    const res = await loginRequest({ username,password });
    setToken(res.data.access || res.data.token);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
