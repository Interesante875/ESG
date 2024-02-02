import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500', // Use HTTPS
  timeout: 10000, // Set timeouts to avoid hanging requests
  withCredentials: true, // Include cookies in cross-site requests
  headers: {
    'Content-Type': 'application/json',
    // Additional headers like Authorization can be added here
  },
});

export default api;
