import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMoon, FiSun, FiSunrise, FiX } from 'react-icons/fi';
import { PiGasPump } from 'react-icons/pi';
import { IoFlashOutline, IoCarSportOutline } from 'react-icons/io5';
import { RiProfileFill } from 'react-icons/ri';
import {
  MdOutlineMessage,
  MdOutlineSubscriptions,
  MdOutlineLiveHelp,
  MdWindow,
} from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { LuMoonStar } from 'react-icons/lu';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { IoMdPerson } from 'react-icons/io';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import ToolTipNavLink from './ToolTipNavLink';
import { useTheme } from '../../contexts/ThemeContext';

const navLinks = [
  { name: 'Dashboard', to: '/main', icon: <MdWindow /> },
  { name: 'Scope 1', to: '/Scope-I', icon: <PiGasPump /> },
  { name: 'Scope 2', to: '/Scope-II', icon: <IoFlashOutline /> },
  { name: 'Scope 3', to: '/Scope-III', icon: <IoCarSportOutline /> },

  { name: 'Feedback', to: '/feedback', icon: <MdOutlineLiveHelp /> },
  { name: 'Users', to: '/userlist', icon: <IoMdPerson /> },
  {
    name: 'Subscription',
    to: '/subscription',
    icon: <MdOutlineSubscriptions />,
  },
  { name: 'Settings', to: '/settings', icon: <GoGear /> },
  { name: 'Help', to: '/help', icon: <IoIosHelpCircleOutline /> },
  { name: 'Sign out', to: '/sign-out', icon: <RiLogoutBoxLine /> },
  // ... add other links as needed
];

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef();

  const { theme, toggleTheme } = useTheme();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // ESC to close sidebar
  useEffect(() => {
    const handleEsc = (event) => {
      // Check if Escape key is pressed
      if (event.key === 'Escape') {
        // Check if sidebar is open and the screen size is small or medium
        const isSmallScreen = window.innerWidth <= 768; // Adjust breakpoint as needed
        if (isOpen && isSmallScreen) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <aside
      ref={sidebarRef}
      className={`flex flex-shrink-0 fixed top-0 left-0 h-full w-64 bg-slate-50 dark:bg-gray-800 shadow-md border-r border-gray-200 dark:border-gray-700 z-30 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ease-in-out transition-all duration-300 lg:relative lg:translate-x-0 overflow-y-auto`}
    >
      <div className="absolute top-0 right-0 p-4 lg:hidden">
        <FiX
          onClick={onClose}
          className="text-gray-500 dark:text-gray-200 cursor-pointer"
        />
      </div>
      <nav className="mt-10 w-full">
        {navLinks.map((link, index) => (
          <ToolTipNavLink
            key={index}
            to={link.to}
            icon={link.icon}
            name={link.name}
          />
        ))}
      </nav>

      <div className="fixed bottom-0 w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <span className="text-base text-gray-800 dark:text-gray-300">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center bg-gray-200 dark:bg-gray-600 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 w-12 h-6"
        >
          <span
            className={`absolute ${
              theme === 'dark' ? 'left-1' : 'right-1'
            } w-4 h-4 bg-slate-400 dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-200`}
          ></span>
          {theme === 'dark' ? (
            <FiMoon className="text-black absolute left-1" size={16} />
          ) : (
            <FiSun className="text-black absolute right-1" size={16} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
