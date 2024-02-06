import React from 'react';
import CompanyForm from '../../components/Form/CompanyForm';

const InfoSubmission = () => {
  return (
    <div className="min-h-screen min-w-full bg-slate-400 dark:bg-stone-800 dark:text-white flex flex-col items-center">
      {/* Full viewport height and width, adjust for navbar to ensure visibility. */}
      <div
        className="w-full flex-1 pt-[var(--navbar-height)] pb-7 overflow-y-auto lg:px-60 md:px-12 px-4"
        style={{ '--navbar-height': '100px' }} // Adjust this based on your navbar's actual height
      >
        {/* Responsive padding to ensure content is centered and not blocked by the navbar. */}
        <div className="flex flex-col items-center justify-center gap-6">
          <CompanyForm />
        </div>
      </div>
    </div>
  );
};

export default InfoSubmission;
