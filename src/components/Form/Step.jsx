import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const Step = ({ stepNumber, pageNumber, title, description }) => {
  const isActive = pageNumber >= stepNumber;
  const isComplete = pageNumber > stepNumber;

  const circleClass = isActive
    ? 'bg-teal-500 dark:bg-blue-900'
    : 'bg-gray-200 dark:bg-blue-900';
  const lineClass = isActive ? 'bg-teal-500' : 'bg-gray-200';
  const textClass =
    pageNumber === stepNumber ? 'text-teal-900' : 'text-gray-800';
  const svgClass = isComplete
    ? 'w-10/12 text-blue-800 dark:text-blue-300 ring-1 ring-offset-1 ring-teal-500 rounded-full'
    : 'w-10/12 h-10/12 text-blue-800 dark:text-blue-300';

  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div
          className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-1 ring-white sm:ring-8 dark:ring-gray-900 shrink-0 ${circleClass}`}
        >
          <svg
            className={svgClass}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isComplete ? <IoMdCheckmark size={20} color="white" /> : null}
          </svg>
        </div>
        <div
          className={`hidden sm:flex md:w-[150px] lg:w-[200px] h-0.5 dark:bg-gray-700 ${lineClass}`}
        ></div>
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className={`${textClass} dark:text-white`}>{title}</h3>
        <p className="text-base font-semibold dark:text-gray-400">
          {description}
        </p>
      </div>
    </li>
  );
};

export default Step;
