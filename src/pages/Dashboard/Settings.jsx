import React, { useState } from 'react';
import { FiSettings, FiLock, FiBell } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { AccountInfoModal, PasswordModal } from '../../components/Settings';

const Settings = () => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Function to toggle the account info modal
  const toggleAccountModal = () => {
    setShowAccountModal(!showAccountModal);
  };

  // Function to toggle the password modal
  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  return (
    <div className="mx-auto p-4 flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white md:p-10 w-full overflow-y-auto h-full">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        User Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Account Info */}
        <div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 cursor-pointer"
          role="button"
          tabIndex="0"
          aria-label="Account Info"
        >
          <FiSettings className="text-3xl mb-3" />
          <h2 className="font-bold text-2xl mb-4">Account Info</h2>
          <p className="mb-4">Manage your account information.</p>
          <button
            onClick={toggleAccountModal}
            className="inline-block px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
          >
            Edit
          </button>
        </div>

        {/* Card for Password */}
        <div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
          role="button"
          tabIndex="0"
          aria-label="Password"
        >
          <FiLock className="text-3xl mb-3" />
          <h2 className="font-bold text-2xl mb-4">Password</h2>
          <p className="mb-4">Change your password.</p>
          <button
            onClick={togglePasswordModal}
            className="inline-block px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
          >
            Change Password
          </button>
        </div>

        {/* Card for Notification Settings */}
        <div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
          role="button"
          tabIndex="0"
          aria-label="Notification Settings"
        >
          <FiBell className="text-3xl mb-3" />
          <h2 className="font-bold text-2xl mb-4">Notification Settings</h2>
          <p className="mb-4">Manage your notifications.</p>
          <button
            disabled
            aria-disabled
            onClick={() => {}}
            className="inline-block px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out disabled:bg-gray-900 disabled:text-gray-400"
          >
            Edit Notfications
          </button>
        </div>
      </div>

      {showAccountModal && <AccountInfoModal closeModal={toggleAccountModal} />}
      {showPasswordModal && <PasswordModal closeModal={togglePasswordModal} />}
    </div>
  );
};

export default Settings;
