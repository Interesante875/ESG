import React from 'react';
import { motion } from 'framer-motion';
import {
  HomeNavbar,
  Home,
  About,
  FeaturesSection,
  TestimonialsSection,
  ContactSection,
  WhyUs,
  Partners,
  RatingSection,
  StepSection
} from '../components/Home';

const HomePage = () => {
  const pageVariants = {
    hidden: {
      opacity: 0,
      x: '-100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  return (
    <div className="font-bold">
      <HomeNavbar />
      <motion.div initial="hidden" animate="visible" variants={pageVariants}>
        <Home />
        <About />
        <FeaturesSection />
        <WhyUs/>
        <StepSection/>
        <TestimonialsSection />
        <Partners/>
        <RatingSection/>
        <ContactSection />
      </motion.div>
    </div>
  );
};

export default HomePage;
