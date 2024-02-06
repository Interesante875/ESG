import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard'; // Assume TestimonialCard is in the same directory

const testimonials = [
  {
    id: 1,
    text: 'TranXEnergy has revolutionized the way we manage our environmental responsibilities.',
    author: 'Alex Johnson',
  },
  {
    id: 2,
    text: 'Their innovative solutions have significantly improved our sustainability metrics.',
    author: 'Maria Smith',
  },
  {
    id: 3,
    text: "We've seen tangible improvements in our ESG reporting, thanks to TranXEnergy.",
    author: 'John Doe',
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
    <div className="max-w-xl mx-auto text-center" id="testimonials">
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
            author={testimonials[activeIndex].author}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-4 space-x-2">
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
