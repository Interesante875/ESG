import axios from 'axios';
import useAuth from '../hooks/useAuth';

const baseURL = 'http://localhost:3500/api/v1';
const timeout = 10000;

export const publicAxios = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: { 'Content-Type': 'application/json' },
});

export const privateAxios = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const usePrivateAxios = () => {
  const { auth, setAccessToken } = useAuth();

  // Private instance
  const privateAxios = axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // Interceptor for handling automatic token refresh and retry logic
  privateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Perform token refresh operation here
          const response = await publicAxios.post('/auth/refresh');
          const { accessToken } = response.data;
          // Update the token in AuthContext
          setAccessToken(accessToken);
          // Update the header and retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle failed refresh here (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return privateAxios;
};
