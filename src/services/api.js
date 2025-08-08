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

export const addFavorite = async (data) => {
  try {
    console.log('🔄 Adding favorite:', data);
    const response = await api.post("/favorites", data);
    console.log('✅ Add favorite response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ addFavorite failed:', error.message);
    throw error;
  }
};

export const removeFavorite = async (data) => {
  try {
    console.log('🔄 Removing favorite:', data);
    const response = await api.delete("/favorites", { data });
    console.log('✅ Remove favorite response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ removeFavorite failed:', error.message);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    console.log('🔄 Getting favorites for user:', userId);
    const response = await api.get(`/favorites/${userId}`);
    console.log('✅ Get favorites response:', response.data?.length, 'movies');
    return response.data;
  } catch (error) {
    console.error('❌ getFavorites failed:', error.message);
    throw error;
  }
};

export const checkFavorite = async (userId, movieId) => {
  try {
    const response = await api.get(`/favorites/check/${userId}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('❌ checkFavorite failed:', error.message);
    throw error;
  }
};