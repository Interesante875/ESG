import { Outlet } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  const verifyRefreshToken = useCallback(async () => {
    try {
      await refresh();
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
  }, [refresh]);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  useEffect(() => {
    // Adding a more detailed condition to track both persist and the presence of accessToken
    const shouldVerifyToken = !auth?.accessToken && persist;
    if (shouldVerifyToken) {
      verifyRefreshToken().finally(() => setIsLoading(false));
    } else {
      // Directly setting isLoading to false if we already have an accessToken or if persist is false
      setIsLoading(false);
    }
  }, [auth?.accessToken, persist, verifyRefreshToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Outlet />;
};

export default PersistLogin;
