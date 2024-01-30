import React from 'react';

const GuidelineModalToggleButton = ({ onClick, buttonText }) => {
  return (
    <button
      onClick={onClick}
      className="bg-teal-900 dark:bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 dark:hover:bg-teal-800 transition-colors"
    >
      {buttonText}
    </button>
  );
};

export default GuidelineModalToggleButton;
