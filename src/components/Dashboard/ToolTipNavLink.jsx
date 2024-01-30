import React from 'react';
import { NavLink } from 'react-router-dom';

const ToolTipNavLink = ({ to, icon, name }) => {
  return (
    <div className="relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 text-sm ${
            isActive
              ? 'border-l-4 border-blue-800 bg-transparent text-blue-800 dark:border-amber-300 dark:text-amber-400'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
          } transition duration-200`
        }
      >
        <span className="mr-2">{icon}</span>
        {name}
      </NavLink>
      {/* <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {name}
      </span> */}
    </div>
  );
};

export default ToolTipNavLink;
