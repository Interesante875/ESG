import React from 'react';
import Step from './Step';

const StepProgress = ({ pageNumber }) => {
  return (
    <div className="md:flex justify-center items-center hidden">
      <ol className="md:ml-10 lg:ml-8 w-full sm:flex">
        <Step
          stepNumber={1}
          pageNumber={pageNumber}
          title="Step 1"
          description="Company Details"
        />
        <Step
          stepNumber={2}
          pageNumber={pageNumber}
          title="Step 2"
          description="Certification and Data"
        />
        <Step
          stepNumber={3}
          pageNumber={pageNumber}
          title="Step 3"
          description="Market Registration"
        />
        <Step
          stepNumber={4}
          pageNumber={pageNumber}
          title="Step 4"
          description="Summary"
        />
      </ol>
    </div>
  );
};

export default StepProgress;
