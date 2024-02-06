import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.5 },
    },
  };

  // Animation variants for interactive elements
  const itemVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-blue-500 text-white p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="home"
    >
      <motion.h1
        className="text-5xl font-bold mb-4"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Empowering Sustainable Growth
      </motion.h1>
      <motion.p
        className="text-xl mb-6"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Unlock your business's potential with eco-friendly solutions.
      </motion.p>
      <motion.div variants={itemVariants} whileHover="hover" whileTap="tap">
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:-translate-y-1">
          Discover More
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
