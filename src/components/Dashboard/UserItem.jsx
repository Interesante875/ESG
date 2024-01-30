import React, { useEffect, useRef, useState } from 'react';
import { FiEye, FiEdit } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const UserItem = ({ user, openModal }) => {
  return (
    <>
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white md:overflow-x-auto">
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">
          <NavLink
            to={`/users/${user.id}`}
            className="text-lg text-black hover:text-blue-800 dark:text-white"
          >
            {user.username}
          </NavLink>
        </td>
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 md:table-cell hidden">
          {user.name}
        </td>
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 md:table-cell hidden">
          {user.position}
        </td>
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 md:table-cell hidden">
          {user.gender}
        </td>
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">
          {user.role}
        </td>
        <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 relative">
          <NavLink
            to={`/user-profile/${user.id}`}
            className="inline mr-2 cursor-pointer hover:text-blue-500"
            title="View Profile"
          >
            <FiEye className="inline mr-2 cursor-pointer hover:text-blue-500 z-1" />
          </NavLink>

          <div className="inline cursor-pointer hover:text-blue-500">
            <FiEdit
              className="inline cursor-pointer hover:text-blue-500 z-1"
              title="Edit User"
              onClick={() => openModal(user)}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserItem;
