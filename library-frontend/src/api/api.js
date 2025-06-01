import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Update if needed
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor to add JWT token to headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor to catch auth errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = '/login'; // or use navigate() if in React
    }
    return Promise.reject(error);
  }
);

// Utility to extract token from API response
const getTokenFromResponse = (response) => {
  const token = response.data?.jwt;
  if (token) return token;

  const authHeader = response.headers?.authorization;
  if (authHeader) {
    return authHeader.replace('Bearer ', '');
  }

  return null;
};

// Attach helper to axios instance
instance.getTokenFromResponse = getTokenFromResponse;

export default instance;
