import React from 'react';
import { motion } from 'framer-motion';

const VerificationMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 max-w-lg rounded-lg shadow-lg bg-white"
      >
        <motion.div
          className="mb-4 inline-flex items-center justify-center bg-blue-100 rounded-full p-3"
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          Verification in Progress
        </h2>
        <p className="text-gray-600 mb-4">
          Your information is currently being verified, please wait for a few
          business days. We will contact you soon.
        </p>
        <p className="text-gray-500 text-sm">- TranXEnergy Development Team</p>
      </motion.div>
    </div>
  );
};

export default VerificationMessage;
