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

export const searchMovies = async (title: string) => {
  const response = await api.get(`/movies/search?title=${title}`);
  return response.data;
};

export const createMovieList = async (
  name: string,
  isPublic: boolean,
  token: string,
  userId: number
) => {
  const response = await api.post(
    "/list/create",
    { userId, name, isPublic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMovieLists = async (userId: number, token: string) => {
  const response = await api.get("/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addMovieToList = async (
  listId: string,
  imdbID: string,
  token: string
) => {
  const response = await api.post(
    `/list/${listId}/movies`,
    { imdbID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default api;
