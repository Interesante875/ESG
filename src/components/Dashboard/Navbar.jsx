import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiMenu, FiSettings, FiLogOut, FiCreditCard } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthProvider';
import useLogout from '../../hooks/useLogout';

const Navbar = ({ onMenuClick, profileName, profileIcon }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  // Define the logout function
  const handleLogout = async () => {
    closeDropdown(); // Ensure the dropdown is closed upon logout
    // Logout logic goes here (e.g., clear auth token, update state, redirect)
    await logout();
    navigate('/sign-in'); // Redirect to sign-in page
  };

  return (
    <nav className="sticky bg-slate-300 dark:bg-slate-700 shadow-md h-16 flex items-center justify-between px-4 lg:px-8 top-0 w-full z-10 py-2">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="text-gray-700 dark:text-amber-200 lg:hidden"
        >
          <FiMenu size={24} />
        </button>
        <NavLink
          to="/home"
          className="hidden lg:block text-xl text-blue-900 dark:text-white font-semibold"
          target="_blank"
        >
          <img
            src="/logo.svg"
            alt="Company Logo"
            className="hidden lg:block h-20 mr-2 align-bottom"
          />
        </NavLink>

        <NavLink
          to="/home"
          className="hidden lg:block text-xl text-blue-900 dark:text-white font-semibold"
          target="_blank"
        >
          Tran
          <span className="text-3xl text-black dark:text-amber-100">X</span>
          Energy
        </NavLink>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-black dark:text-amber-100 mr-2">
            {profileName}
          </span>
          {profileIcon ? (
            <img
              src={profileIcon}
              alt="Profile"
              className="rounded-full border border-gray-300 dark:border-gray-600"
            />
          ) : (
            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-500 text-white">
              {profileName.charAt(0)}
            </div>
          )}
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <NavLink
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={closeDropdown}
            >
              <FiSettings className="inline mr-2" /> Settings
            </NavLink>
            <NavLink
              to="/subscription"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={closeDropdown}
            >
              <FiCreditCard className="inline mr-2" /> Subscription
            </NavLink>
            <NavLink
              to="/sign-out"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
              onClick={handleLogout}
            >
              <FiLogOut className="inline mr-2" /> Sign Out
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
