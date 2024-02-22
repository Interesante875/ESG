import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard'; // Assume TestimonialCard is in the same directory

const testimonials = [
  {
    id: 1,
    text: 'TransXEnergy provides companies with a comprehensive solution for accurately measuring and reporting all carbon emission scopes in accordance with international standards.',
    title: 'Our Product',
    source:'/product.jpg'
  },
  {
    id: 2,
    text: "Our strategy revolves around continuous innovation, collaboration, and customer-centricity. We prioritize feedback from users and stakeholders to drive improvements and refine our platform's features and functionality continually.",
    title: 'Our Strategy',
    source:'/strategy.jpg'
  },
  {
    id: 3,
    text: "We take a holistic approach to carbon reporting, considering not only the technical aspects but also the broader implications for sustainability and corporate responsibility aligning with the ISO14064-1 standard, ensuring a systematic and rigorous methodology for carbon reporting and management",
    title: 'Our Approach',
    source:'/approach.jpg'
  },
  // Add more testimonials as needed
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg min-h-30 py-8 mx-auto content-center text-center" id="testimonials">
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[activeIndex].id}
          initial={{ opacity: 0, rotateY: -30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 30 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialCard
            testimonial={testimonials[activeIndex].text}
            title={testimonials[activeIndex].title}
            source={testimonials[activeIndex].source}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === activeIndex ? 'bg-blue-500' : 'bg-blue-200'
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
