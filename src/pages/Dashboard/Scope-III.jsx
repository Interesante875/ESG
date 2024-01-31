import { useState } from 'react';
import {
  BusinessTravelCard,
  EmployeeCommutingCard,
} from '../../components/Dashboard/ScopeIII';

import GuidelineModalToggleButton from '../../components/Dashboard/GuidelineModalToggleButton';
import GuidelineModal from '../../components/Dashboard/GuidelineModal';

const ScopeIII = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 w-full h-full">
      <div className="hidden lg:flex pl-10 mt-10">
        <GuidelineModalToggleButton
          onClick={handleToggleModal}
          buttonText="Guidelines"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-around items-center pt-10 px-1 lg:pl-15 xl:pl-20">
        <BusinessTravelCard />
        <EmployeeCommutingCard />
      </div>
      <GuidelineModal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        title="Modal Title"
        subtitle="Modal Subtitle"
        content={<p>This is a guideline for scope III</p>}
      />
    </div>
  );
};

export default ScopeIII;
