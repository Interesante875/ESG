import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  // Handler for clicking outside the modal
  const handleCancelClickAway = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  // Handler for the confirm action
  const handleConfirm = () => {
    onConfirm();
    onCancel(); // Close the modal after confirmation
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
      onClick={handleCancelClickAway}
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 focus:outline-none"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
