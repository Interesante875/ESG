import React from 'react';
import { ReportingCard } from './ReportingCard';
import { LiaCarBatterySolid } from 'react-icons/lia';
import { RiFlashlightLine } from 'react-icons/ri';
// Energy Purchase Card
export const EnergyPurchasesCard = () => (
  <ReportingCard
    icon={<RiFlashlightLine />}
    title="Energy Purchase"
    description="Including the purchases of electricity, steam, heat, or cooling."
    link="/scope-ii/energy-purchase"
    bgColor="bg-green-600 dark:bg-green-900"
    textColor="text-white"
  />
);

// Electricity Vehicle Card
export const ElectricVehicleCard = () => (
  <ReportingCard
    icon={<LiaCarBatterySolid />}
    title="Electric Vehicle"
    description="Electricity purchased or used for electric vehicles (was not included in Scope 1)."
    link="/scope-ii/electric-vehicle"
    bgColor="bg-cyan-600 dark:bg-cyan-800"
    textColor="text-white"
  />
);
