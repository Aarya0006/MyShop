import api from "./api";

export const loginRequest = (creds) => api.post("/auth/login/", creds);
export const signupRequest = (data) => api.post("/auth/signup/", data);
export const getProfile = () => api.get("/auth/profile/");
