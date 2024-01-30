import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <div className="max-w-screen max-h-screen h-screen w-screen flex flex-col">
        <Navbar onMenuClick={toggleSidebar} profileName="John Doe" />
        <div className="w-screen h-[100%] flex">
          <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
          {/* Adjust margin to match sidebar width */}
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
