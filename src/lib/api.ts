import axios from "axios";

const API_URL = process.env.PUBLIC_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email: email,
    password,
  });
  return response.data;
};

export const register = async (
  userName: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    userName,
    email,
    password,
  });
  return response.data;
};

export default api;
