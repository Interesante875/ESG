import React from 'react';
import { LuFuel } from 'react-icons/lu';
import { LiaCarSideSolid } from 'react-icons/lia';
import { BsSnow } from 'react-icons/bs'; // Adjust the import path
import { ReportingCard } from './ReportingCard';

// Stationary Combustion Card
export const StationaryCombustionCard = () => (
  <ReportingCard
    icon={<LuFuel />}
    title="Stationary Combustion"
    description="The process of burning fuels in fixed locations, such as power plants or industrial furnaces."
    link="/Table-Stationary-Combustion"
    bgColor="bg-blue-600 dark:bg-blue-800"
    textColor="text-white"
  />
);

// Mobile Combustion Card
export const MobileCombustionCard = () => (
  <ReportingCard
    icon={<LiaCarSideSolid />}
    title="Mobile Combustion"
    description="The combustion of fuels in mobile sources like vehicles or aircraft engines."
    link="/Table-Mobile-Combustion"
    bgColor="bg-green-600 dark:bg-green-800"
    textColor="text-white"
  />
);

// Fugitive Emission Card
export const FugitiveEmissionCard = () => (
  <ReportingCard
    icon={<BsSnow />}
    title="Fugitive Emission"
    description="The unintentional release of pollutants during industrial activities, including leaks or evaporation."
    link="/Table-Fugitive-Emission"
    bgColor="bg-purple-600 dark:bg-purple-800"
    textColor="text-white"
  />
);
