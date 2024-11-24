import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Uses the environment variable
});

// Optional: Add interceptors for logging or error handling.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.data?.message || 'An error occurred');
    return Promise.reject(error);
  }
);

export default API;
