import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, author }) => {
  return (
    <motion.div
      className="p-4 bg-blue-100 rounded-lg shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-gray-800 text-lg">{testimonial}</p>
      <p className="text-gray-600 font-bold mt-2">- {author}</p>
    </motion.div>
  );
};

export default TestimonialCard;
