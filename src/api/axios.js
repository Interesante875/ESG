import axios from 'axios';

// Create a custom axios instance for default export
const customAxios = axios.create({
  baseURL: 'http://localhost:3500', // Changed to HTTPS
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a private axios instance for authenticated requests
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3500', // Changed to HTTPS
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // Additional headers like Authorization can be added here
  },
});

// Export the custom axios instance as default
export default customAxios;
