import axios from 'axios';

const api = axios.create({
 baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Change to your production URL later //'http://localhost:5000/api'
});//baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Request interceptor to add the auth token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;