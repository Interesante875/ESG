import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

const GuidelineModal = ({ isOpen, onClose, title, subtitle, content }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative max-w-lg w-full max-h-[50vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-xl text-gray-800 dark:text-white font-bold">
          {title}
        </h2>
        <h3 className="text-md text-gray-700 dark:text-gray-300 mb-4">
          {subtitle}
        </h3>
        <div className="text-gray-700 dark:text-gray-300">{content}</div>
      </div>
    </div>
  );
};

export default GuidelineModal;
