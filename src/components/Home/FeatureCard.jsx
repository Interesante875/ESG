import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.div
      layout
      initial={{ borderRadius: 10 }}
      onClick={toggleOpen}
      className="w-full max-w-xs bg-blue-200 cursor-pointer shadow-lg m-2"
    >
      <motion.div className="p-4">
        <motion.h2 className="text-xl font-bold">{title}</motion.h2>
        <motion.p
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="text-sm"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;
