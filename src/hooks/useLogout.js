import customAxios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await customAxios.post('/api/v1/auth/logout', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
