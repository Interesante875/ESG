import React from 'react';
import { MdCardTravel } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { ReportingCard } from './ReportingCard';

// Business Travel Card
export const BusinessTravelCard = () => (
  <ReportingCard
    icon={<MdCardTravel />}
    title="Business Travel"
    description="Emissions from employee travel for business purposes, including various transportation modes that are not owned or controlled by the organization."
    link="/Table-Business-Travel"
    bgColor="bg-blue-600 dark:bg-blue-800"
    textColor="text-white"
  />
);

// Employee Commuting Card
export const EmployeeCommutingCard = () => (
  <ReportingCard
    icon={<BiBuildingHouse />}
    title="Employee Commuting"
    description="Emissions from the employee transportation between worksites and home, including various transportation modes that are not owned or operated by the organization."
    link="/Table-Employee-Commuting"
    bgColor="bg-pink-600 dark:bg-pink-800"
    textColor="text-white"
  />
);
