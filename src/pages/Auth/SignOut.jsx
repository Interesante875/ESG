import React, { useState } from 'react';
import { FiHome } from 'react-icons/fi'; // Importing home icon from react-icons
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();
  // const [errorTrigger, setErrorTrigger] = useState(false);

  // const throwError = () => {
  //   setErrorTrigger(true);
  // };

  // if (errorTrigger) {
  //   // Deliberately throw an error
  //   throw new Error('Deliberate Error Triggered');
  // }

  const handleNavigation = () => {
    navigate('/home');
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-gray-100"
      onClick={handleNavigation}
    >
      <div
        className="bg-white shadow-lg rounded-lg p-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-5 left-5">
          <div className="group relative flex items-center">
            <FiHome
              size={24}
              className="text-blue-500 cursor-pointer"
              onClick={handleNavigation}
            />
            <span className="ml-2 whitespace-nowrap absolute left-full transform -translate-y-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Home Page
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Signed Out</h1>
        <p className="text-gray-600 mb-8">You have successfully signed out.</p>
        {/* <button
          onClick={throwError}
          className="bg-red-500 text-white p-2 rounded"
        >
          Trigger Error
        </button> */}
        {/* You can add more content or buttons as needed */}
      </div>
    </div>
  );
};

export default SignOut;
