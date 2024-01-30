import React from 'react';
import { NavLink } from 'react-router-dom';

export const ReportingCard = ({
  icon,
  title,
  description,
  link,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`flex flex-col justify-between w-full md:w-64 lg:w-72 xl:w-80 h-60 p-5 ${bgColor} rounded-lg shadow-lg m-2 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}
    >
      <div>
        <div
          className={`text-lg font-semibold ${textColor} mb-3 flex items-center`}
        >
          <div className="text-3xl mr-3">{icon}</div>
          <span>{title}</span>
        </div>
        <p className={`text-sm ${textColor}`}>{description}</p>
      </div>
      <NavLink
        to={link}
        className="mt-4 inline-block w-full text-center bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-300 font-medium text-sm px-4 py-2 rounded hover:bg-teal-300 dark:hover:bg-teal-600 transition-colors"
      >
        View Report
      </NavLink>
    </div>
  );
};
