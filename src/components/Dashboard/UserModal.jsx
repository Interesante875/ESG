import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiEdit2, FiUserPlus, FiTrash2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const UserModal = ({ isOpen, onClose, user, updateUser, deleteUser }) => {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState('actions'); // 'actions', 'changeRole', 'deleteConfirm'

  useEffect(() => {
    // Resets to default modal content when reopened
    setModalContent('actions');

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleChangeRole = (newRole) => {
    // Here you would update the user's role in your application's state
    updateUser({ ...user, role: newRole });
    onClose(); // Close the modal after the change
  };

  const handleConfirmDelete = () => {
    deleteUser(user.id); // This function should handle the deletion logic
    onClose(); // Close the modal after deletion
  };

  const changeRoleContent = (
    <>
      <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">
        Change User Role
      </h3>
      {['Employee', 'Editor', 'Admin'].map((role) => (
        <div
          key={role}
          onClick={() => handleChangeRole(role)}
          className="p-2 text-black dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 rounded"
        >
          <h4 className="font-bold ">{role}</h4>
          <p>Description and privileges of the {role.toLowerCase()} role.</p>
        </div>
      ))}
    </>
  );

  const deleteConfirmContent = (
    <>
      <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">
        Confirm Deletion
      </h3>
      <p className="text-black dark:text-gray-100">
        Are you sure you want to delete this user?
      </p>
      <div className="flex justify-around mt-4">
        <button
          className="px-4 py-2 bg-red-600 dark:text-gray-50 rounded hover:bg-red-700"
          onClick={handleConfirmDelete}
        >
          Confirm
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-blac rounded hover:bg-gray-300"
          onClick={() => setModalContent('actions')}
        >
          Cancel
        </button>
      </div>
    </>
  );

  const actionsContent = (
    <>
      <NavLink
        to={`/user-details/${user?.id}`}
        className="text-lg text-gray-700 dark:text-gray-300 mb-4 flex w-full text-left p-2 hover:bg-gray-500 rounded"
      >
        <FiEdit2 className="mr-2" size={24} /> Edit User Details
      </NavLink>
      <button
        className="text-lg text-gray-700 dark:text-gray-300 mb-4 flex w-full text-left p-2 hover:bg-gray-500 rounded"
        onClick={() => setModalContent('changeRole')}
      >
        <FiUserPlus className="mr-2" size={24} /> Change User Role
      </button>
      <button
        className="text-lg text-gray-700 dark:text-gray-300 mb-4 flex w-full text-left p-2 hover:bg-gray-500 rounded"
        onClick={() => setModalContent('deleteConfirm')}
      >
        <FiTrash2 className="mr-2" size={24} />
        Delete User
      </button>
    </>
  );

  const getContent = () => {
    switch (modalContent) {
      case 'changeRole':
        return changeRoleContent;
      case 'deleteConfirm':
        return deleteConfirmContent;
      default:
        return actionsContent;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-1000"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="border bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold text-black dark:text-gray-50">
            User Actions: {user?.name}
          </h4>
          <button
            className="text-gray-700 dark:text-gray-300"
            onClick={onClose}
          >
            <FiX size={24} />
          </button>
        </div>
        {getContent()}
      </div>
    </div>
  );
};

export default UserModal;
