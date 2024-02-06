import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.div
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 bg-blue-100 p-8"
    >
      <h2 className="text-3xl font-bold text-blue-500">About Us</h2>
      <p className="text-lg text-blue-700">
        TranXEnergy is dedicated to empowering businesses and communities to
        achieve sustainable growth through innovative environmental, social, and
        governance (ESG) solutions. Our commitment to eco-friendly practices
        drives us to deliver exceptional value while preserving our planet for
        future generations.
      </p>
      <motion.img
        src="/about-image.jpg" // Replace with your image path
        alt="About Us"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg rounded-lg shadow-lg"
      />
    </motion.div>
  );
};

export default About;
