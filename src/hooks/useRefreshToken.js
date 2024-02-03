import customAxios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await customAxios.get('/api/v1/auth/refresh', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
