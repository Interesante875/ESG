import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: '0px 0px 8px rgb(255, 255, 255)',
      boxShadow: '0px 0px 8px rgb(255, 255, 255)',
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 w-full bg-white z-50 shadow-md"
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
    >
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold text-blue-500">TranXEnergy</div>
        <div className="hidden space-x-4 md:flex">

        {/* Home button, Solutions, Certifications, COmpany (Newsletter, about us), Career, FAQ
 */}

          <a
            href="#home"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Home
          </a>
          <a
            href="#solutions"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Solutions
          </a>
          <a
            href="#certifications"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Certifications
          </a>
          <a
            href="#aboutus"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            About Us
          </a>
          <a
            href="#career"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            Career
          </a>
          <a
            href="#faq"
            className="text-gray-600 hover:text-blue-500 transition duration-300"
          >
            FAQ
          </a>
        </div>
        <div className="flex space-x-2">
          <motion.div variants={buttonVariants} whileHover="hover">
            <NavLink
              to="/sign-in"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow"
            >
              Login
            </NavLink>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <NavLink
              to="/sign-up"
              className="bg-green-500 text-white px-4 py-2 rounded shadow"
            >
              Sign Up
            </NavLink>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
