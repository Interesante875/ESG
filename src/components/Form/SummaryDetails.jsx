import React from 'react';
import { motion } from 'framer-motion';
import PageTitle from './PageTitle';
import PageSubtitle from './PageSubtitle';

const SummaryDetails = ({ formikProps }) => {
  const detailVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  // Adjusting container padding and alignment for larger screens
  const containerStyles =
    'dark:text-gray-200 p-4 my-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 mx-auto w-full md:max-w-4xl lg:max-w-9xl xl:max-w-full';

  return (
    <>
      <PageTitle>Summary</PageTitle>
      <PageSubtitle>Review your information</PageSubtitle>
      <motion.div
        className={containerStyles}
        initial="hidden"
        animate="visible"
        variants={detailVariant}
      >
        {Object.keys(formikProps.values).map((key, index) =>
          key !== 'ssmCertificate' ? (
            <motion.p key={key} custom={index} variants={detailVariant}>
              {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
              : {formikProps.values[key]}
            </motion.p>
          ) : (
            formikProps.values[key] && (
              <motion.p key={key} custom={index} variants={detailVariant}>
                SSM Certificate: {formikProps.values[key].name}
              </motion.p>
            )
          )
        )}
      </motion.div>
    </>
  );
};

export default SummaryDetails;
