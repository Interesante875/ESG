import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';
import InfoSubmission from '../../pages/Auth/InfoSubmission';
import { jwtDecode } from 'jwt-decode';

const DashboardLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');

  // console.log(auth);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsername = async () => {
      try {
        const response = await axiosPrivate.get('/user/get-username', {
          signal: controller.signal,
        });
        // console.log(response.data);
        if (isMounted) {
          setUsername(response.data.username);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Log for debugging purposes
          // console.log('Request cancelled:', err.message);
        } else {
          console.error('Request failed:', err);
          // Only navigate if the error was not a cancellation
          navigate('/sign-in', { state: { from: location }, replace: true });
        }
      }
    };

    getUsername();

    return () => {
      isMounted = false;
      controller.abort();
      // console.log('Cleanup: Cancelled any ongoing requests.');
    };
  }, [navigate, location, axiosPrivate]);

  return auth?.companyName ? (
    <ThemeProvider>
      <div className="max-w-screen max-h-screen h-screen w-full flex flex-col">
        <Navbar onMenuClick={toggleSidebar} profileName={username} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={toggleSidebar}
            disable={false}
          />
          {/* Adjust margin to match sidebar width */}
          <main className="flex flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  ) : auth?.accessToken ? (
    <ThemeProvider>
      <div className="max-w-screen max-h-screen h-screen w-full flex flex-col">
        <Navbar
          onMenuClick={toggleSidebar}
          profileName={username}
          disable={false}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={toggleSidebar}
            disable={true}
          />
          {/* Adjust margin to match sidebar width */}
          <main className="flex flex-1 overflow-y-auto">
            <InfoSubmission />
          </main>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default DashboardLayout;
