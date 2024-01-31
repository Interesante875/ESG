import React from 'react';
import { BoxCard, TableBox } from '../../components/Charts';
import { MdOutlineSsidChart } from 'react-icons/md';
import { TbSum } from 'react-icons/tb';
import { GrCycle } from 'react-icons/gr';
import { MdPeopleOutline } from 'react-icons/md';

const Statistics = () => {
  const data = [
    { username: 'User_1', kgCO2e: 39.65, scope: 'Scope 1' },
    { username: 'User_2', kgCO2e: 75.5, scope: 'Scope 2' },
    { username: 'User_3', kgCO2e: 55.08, scope: 'Scope 1' },
    { username: 'User_4', kgCO2e: 75.08, scope: 'Scope 1' },
    { username: 'User_5', kgCO2e: 38.68, scope: 'Scope 2' },
    { username: 'User_6', kgCO2e: 76.14, scope: 'Scope 3' },
    { username: 'User_7', kgCO2e: 23.68, scope: 'Scope 1' },
    { username: 'User_8', kgCO2e: 45.19, scope: 'Scope 2' },
    { username: 'User_9', kgCO2e: 80.31, scope: 'Scope 2' },
    { username: 'User_10', kgCO2e: 75.14, scope: 'Scope 3' },
  ];

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 p-4 md:pl-10 w-full h-full overflow-y-auto max-h-full max-w-full">
      <div className="flex flex-col lg:flex-row p-2 lg:p-5">
        <BoxCard
          title={'Total Carbon Emission'}
          value={4.51}
          unit={'kgCO2e'}
          Icon={TbSum}
          link="/total-carbon-emission"
        />
        <BoxCard
          title={'Yearly Change in Carbon Percentage'}
          value={4.51}
          unit={'%'}
          Icon={GrCycle}
          link="/change-in-emission"
        />
        <BoxCard
          title={'Carbon Offset'}
          value={4.51}
          unit={'kgCO2e'}
          Icon={MdOutlineSsidChart}
          link="/offset"
        />
        <BoxCard
          title={'Carbon Footprint per Employee'}
          value={4.51}
          unit={'average kgCO2e'}
          Icon={MdPeopleOutline}
          link="/employee-carbon"
        />
      </div>

      <div className="flex bg-slate-400 dark:bg-stone-800">
        <TableBox data={data} />
      </div>
    </div>
  );
};

export default Statistics;
