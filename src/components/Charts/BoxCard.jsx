import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { IoChevronForward } from 'react-icons/io5';

const BoxCard = ({ title, value, unit, Icon, link }) => (
  <div className="group relative bg-slate-200 dark:bg-gray-700 shadow-md rounded-lg p-4 mx-5 lg:my-2 my-3 min-w-[280px] max-w-full lg:max-w-[15%] dark:text-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-105 transform-gpu">
    <div className="flex items-center space-x-2 min-h-[80px] mb-2 lg:mb-5">
      {Icon && (
        <Icon
          className="text-2xl text-blue-500 dark:text-blue-300"
          aria-hidden="true"
          size={30}
        />
      )}
      <div className="font-bold text-xl">{title}</div>
    </div>
    <div className="mt-3 flex items-baseline space-x-2">
      <div className="text-3xl font-bold leading-8 dark:text-white">
        {value}
      </div>
      {unit && (
        <span className="text-lg text-gray-500 dark:text-gray-300">{unit}</span>
      )}
    </div>
    {link && (
      <div className="group relative">
        <NavLink to={link} className="inline-block">
          <IoChevronForward
            size={40}
            className="text-blue-500 dark:text-blue-300 absolute right-0.5 top-1/2 transform -translate-y-1/2 lg:opacity-25 md:opacity-50 sm:opacity-100 opacity-85 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 ease-in-out"
          />
        </NavLink>
      </div>
    )}
  </div>
);

BoxCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  Icon: PropTypes.elementType,
  link: PropTypes.string,
};

export default BoxCard;
