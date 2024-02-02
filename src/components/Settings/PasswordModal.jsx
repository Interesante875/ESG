import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordModal = ({ closeModal }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    if (name === 'newPassword') {
      setPasswordError('');
      checkPasswordStrength(value);
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Prevent copy and paste
  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError('All fields are required');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }
    console.log('Password updated:', passwordData.newPassword);
    closeModal();
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );

    if (strongRegex.test(password)) setPasswordStrength('Strong');
    else if (mediumRegex.test(password)) setPasswordStrength('Medium');
    else setPasswordStrength('Weak');
  };

  const strengthColor =
    passwordStrength === 'Strong'
      ? 'bg-green-500'
      : passwordStrength === 'Medium'
      ? 'bg-yellow-500'
      : 'bg-red-500';
  const strengthBarWidth =
    passwordStrength === 'Strong'
      ? 'full'
      : passwordStrength === 'Medium'
      ? '2/3'
      : '1/3';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center p-4">
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full space-y-6 overflow-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h2 className="text-3xl font-semibold mb-6 dark:text-white">
          Change Password
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {Object.keys(passwordData).map((field, index) => (
            <div key={index} className="relative space-y-1">
              <label
                htmlFor={field}
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                {field
                  .replace(/([A-Z])/g, ' $1')
                  .charAt(0)
                  .toUpperCase() + field.slice(1)}
              </label>
              <div className="flex items-center mt-1 relative">
                <input
                  type={showPassword[field] ? 'text' : 'password'}
                  name={field}
                  id={field}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-lg px-4 py-2"
                  value={passwordData[field]}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword[field] ? (
                    <FiEyeOff
                      className="cursor-pointer text-xl"
                      onClick={() => toggleShowPassword(field)}
                    />
                  ) : (
                    <FiEye
                      className="cursor-pointer text-xl"
                      onClick={() => toggleShowPassword(field)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center">
            <div className="text-lg font-medium mr-2">Strength:</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full ${strengthColor}`}
                style={{ width: strengthBarWidth }}
              ></div>
            </div>
            <div
              className={`ml-2 text-lg ${
                strengthColor === 'bg-green-500'
                  ? 'text-green-700'
                  : strengthColor === 'bg-yellow-500'
                  ? 'text-yellow-700'
                  : 'text-red-700'
              }`}
            >
              {passwordStrength}
            </div>
          </div>
          {passwordError && (
            <p className="mt-2 text-lg text-red-500">{passwordError}</p>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white text-lg rounded transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded transition duration-150 ease-in-out"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
