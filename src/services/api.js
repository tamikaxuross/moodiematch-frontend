import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api", 
});

export const createQuiz = (data) => api.post("/quiz", data);
export const getQuiz = (id) => api.get(`/quiz/${id}`);
