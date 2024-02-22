import React from 'react';
import { FaStar } from "react-icons/fa";

const RatingCard = ({ author, position, title, rate, star}) => {
    
   // Create an array of length 'count' filled with null values
  const stars = Array.from({ length: star }, (_, index) => index);

  return (
    <div
      className="relative text-start p-6 w-80 h-96 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out "
    >

      <div className = "pb-2 flex text-yellow-300">
      {stars.map((_, index) => (
        <span key = {index}><FaStar/></span>
      ))}
      </div>
      <p className="text-gray-600 font-extrabold text-lg mt-2 mb-3">"{title}"</p>
      <p className="text-gray-800 text-sm font-light mb-4">{rate}</p>
      <div className = "absolute left-0 bottom-20 border border-gray-300 w-full rounded-lg"></div>
      <p className="absolute bottom-12 text-gray-800 text-sm font-bold mt-4">{author}</p>
      <p className="absolute bottom-6 text-gray-800 text-sm font-normal mt-1">{position}</p>
    </div>
  );
};

export default RatingCard;
