import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const DashboardLayout = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (auth?.companyName) {
    return (
      <ThemeProvider>
        <div className="max-w-screen max-h-screen h-screen w-full flex flex-col">
          <Navbar onMenuClick={toggleSidebar} profileName={auth?.username} />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
            {/* Adjust margin to match sidebar width */}
            <main className="flex flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  } else if (auth?.username) {
    return <Navigate to="/lounge" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
};

export default DashboardLayout;
