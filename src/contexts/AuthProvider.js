import { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  const setAccessToken = (token) => {
    setAuth((prev) => ({ ...prev, accessToken: token }));
    // Optionally, configure axios defaults here if token is updated
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
