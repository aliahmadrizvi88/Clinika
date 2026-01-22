import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

// Helper function for cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Always get fresh token from cookies
    const token = getCookie('doc_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - Redirecting to login');
      // Clear cookies and redirect
      document.cookie.split(';').forEach((c) => {
        document.cookie =
          c.trim().split('=')[0] +
          '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
