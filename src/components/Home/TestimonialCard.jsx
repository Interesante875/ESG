import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, title, source}) => {
  return (
    <motion.div
      className="p-8 bg-blue-100 rounded-lg shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      
      <p className="text-gray-600 font-extrabold text-lg mt-2 mb-3">{title}</p>
      <motion.img
              src={source} // Replace with your image path
              alt="About Us"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="mb-3 flex justify-center items-center rounded-lg shadow"
            />
      <p className="text-gray-800 text-md font-medium">{testimonial}</p>
    </motion.div>
  );
};

export default TestimonialCard;
