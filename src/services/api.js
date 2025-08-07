import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api", 
});

// Add request logging for debugging
api.interceptors.request.use(request => {
  console.log('🚀 API Request:', request.method?.toUpperCase(), request.url);
  return request;
});

// Add response logging for debugging
api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export const createUser = async (data) => {
  const response = await api.post("/users", data);
  return response.data; 
};


export const createQuiz = async (data) => {
  const response = await api.post("/quiz", data);
  return response.data;  
};

export const getQuiz = async (id) => {
  const response = await api.get(`/quiz/${id}`);
  return response.data;  
};