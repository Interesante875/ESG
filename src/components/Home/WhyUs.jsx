import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiDart } from 'react-icons/gi'
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi'
import { GoStarFill } from 'react-icons/go'

const WhyUs = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  React.useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [controls, inView])

  const variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  }

  return (
    <motion.div
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="min-h-screen flex flex-col space-y-4 bg-blue-100 p-4 md:p-16 lg:p-4 "
    >
      <div className = "grid grid-rows-2 md:grid-rows-none md:grid-cols-2 md:grid-cols-2">
        <h1 className="col-span-2 md:col-span-1 text-4xl px-0 py-6 lg:ml-8 lg:p-8 text-center md:text-start">We are a better reporting platform</h1>
        <h1 className="col-span-2 md:col-span-1 flex justify-end items-end text-center md:text-start text-base font-light">We stand out as the preferred choice for carbon reporting due to our commitment to accuracy, relatively affordable, and user satisfaction. Our platform offers unparalleled convenience, reliability, and support, helping companies navigate complex reporting requirements with ease.</h1>
      </div>
      <div className="block lg:grid lg:grid-cols-2 w-full ">
        <div className="py-3 w-full px-1 sm:px-0 flex items-start ">
          <div className="relative text-gray-700 antialiased text-sm font-semibold">
            <div className="hidden lg:block mt-6 w-1 bg-blue-300 absolute h-4/5 left-24 transform -translate-x-1/2"></div>

            <div className="mt-0 md:mt-0 md:mb-24">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-3/4 pl-4">
                    <div className="p-4">
                        <p className = "text-extrabold text-2xl font-['Inter']">Accuracy</p>    
                        <p>Our commitment to precision ensures reliable carbon reporting results.</p>    
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 w-16 h-16 absolute left-12 md:left-24 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <GiDart className="text-white w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:mb-24">
              <div className="rerlative flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-3/4 pl-4">
                    <div className="p-4">
                        <p className = "text-extrabold text-2xl font-['Inter']">Affordable</p>    
                        <p className = "text-base">Offering competitive pricing, our platform makes carbon reporting accessible to all.</p>    
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 w-16 h-16 absolute left-12 md:left-24 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <PiCurrencyDollarSimpleBold className="text-white w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex justify-end w-full mx-auto items-center">
                  <div className="w-3/4 pl-4">
                    <div className="p-4">
                        <p className = "text-extrabold text-2xl font-['Inter']">User Satisfaction</p>    
                        <p>With a focus on user experience, we prioritize satisfaction in every aspect of our service.</p>    
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-blue-500 border-white border-4 w-16 h-16 absolute left-12 md:left-24 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center">
                  <GoStarFill className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.img
        src="/datareports-scaled.jpg" // Replace with your image path
        alt="About Us"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block p-10 w-full flex justify-center place-item-center items-center md:h-3/4 lg:h-full"
      />
      </div>
    </motion.div>
  )
}

export default WhyUs
