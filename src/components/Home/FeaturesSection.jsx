import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import FeatureCard from './FeatureCard' // Assume FeatureCard is in the same directory
// import { useState } from 'react'
// import { useInView } from 'react-intersection-observer'
// import { PiStrategyLight } from 'react-icons/pi'
// import { MdFilterFrames } from 'react-icons/md'
// import { PiShoppingBagOpenLight } from "react-icons/pi";

// const FeaturesSection = () => {
//   const controls = useAnimation()
//   const [ref, inView] = useInView()
//   const [option, setOption] = useState(['strategy'])

//   React.useEffect(() => {
//     if (inView) {
//       controls.start('visible')
//     } else {
//       controls.start('hidden')
//     }
//   }, [controls, inView])

//   const variants = {
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//     hidden: { opacity: 0, scale: 0.8 },
//   }
//   return (
//     <motion.div
//       id="about"
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       className="min-h-[500px] flex flex-col items-center space-y-4 bg-gray-100 p-8 mb-8 "
//     >
//       <div className="grid grid-cols-3 flex place-items-center w-full">
//         <div className="rounded-full bg-white border-white border-4 w-16 h-16 flex items-center justify-center">
//           <button type="button" onClick={() => setOption('product')}>
//             <PiShoppingBagOpenLight className="text-blue-500 w-8 h-8" />
//           </button>
//         </div>
//         <div className="rounded-full bg-white border-white border-4 w-16 h-16 flex items-center justify-center">
//           <button type="button" onClick={() => setOption('strategy')}>
//             <PiStrategyLight className="text-blue-500 w-8 h-8" />
//           </button>
//         </div>
//         <div className="rounded-full bg-white border-white border-4 w-16 h-16 flex items-center justify-center">
//           <button type="button" onClick={() => setOption('approach')}>
//             <MdFilterFrames className="text-blue-500 w-8 h-8" />
//           </button>
//         </div>
        
//       </div>
//       <div className="grid grid-cols-3 place-items-center w-full py-0 my-0 mb-32">
//         <p>Our Product</p>
//         <p>Our Strategy</p>
//         <p>Our Approach</p>
//       </div>

//       <div className="p-10 container rounded-lg shadow border border-gray-100 w-3/4 h-3/4 lg:w-1/3 lg:h-1/3 ">
//         {option === 'strategy' ? (
//           <>
//             <motion.img
//               src="/strategy.jpg" // Replace with your image path
//               alt="About Us"
//               whileInView={{ opacity: 1, x: 0 }}
//               initial={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.5 }}
//               className="mb-8 flex justify-center rounded-lg shadow"
//             />
//             <p className = "font-normal">
//               Our strategy revolves around continuous innovation, collaboration,
//               and customer-centricity. We prioritize feedback from users and
//               stakeholders to drive improvements and refine our platform's
//               features and functionality continually.
//             </p>
//           </>
//         ) : (
//           <>
//             <motion.img
//               src="/approach.jpg" // Replace with your image path
//               alt="About Us"
//               whileInView={{ opacity: 1, x: 0 }}
//               initial={{ opacity: 0, x: -100 }}
//               transition={{ duration: 0.5 }}
//               className="mb-8 flex justify-center rounded-lg shadow"
//             />
//             <p className = "font-normal">
//               We take a holistic approach to carbon reporting, considering not
//               only the technical aspects but also the broader implications for
//               sustainability and corporate responsibility aligning with the 
//               <span className = "font-bold"> ISO14064-1</span> standard, ensuring a systematic and rigorous
//               methodology for carbon reporting and management
//             </p>
//           </>
//         )}
//       </div>
//     </motion.div>
//   )
// }

// export default FeaturesSection
 
const featuresData = [
  {
    title: 'Eco-Friendly Solutions',
    description:
      'Discover our range of sustainable practices that help protect the environment.',
  },
  {
    title: 'Innovative Technology',
    description:
      'Leveraging cutting-edge technology to offer efficient ESG management solutions.',
  },
  {
    title: 'Community Engagement',
    description:
      'Building strong, sustainable communities through active engagement and support.',
  },
  // Add more features as needed
];

const FeaturesSection = () => {
  return (
    <div className="flex overflow-x-hidden py-8" id="features">
      {featuresData.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
