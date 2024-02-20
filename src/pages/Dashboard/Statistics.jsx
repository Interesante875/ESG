import React, { useEffect, useState } from 'react';
import { BoxCard, TableBox } from '../../components/Charts';
import { MdOutlineSsidChart } from 'react-icons/md';
import { TbSum } from 'react-icons/tb';
import { GrCycle } from 'react-icons/gr';
import { MdPeopleOutline } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';

const Statistics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get('/record/home-record-list', {
          signal: controller.signal,
        });

        if (isMounted) {
          // console.log(response.data);
          setData(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Log for debugging purposes
          // console.log('Request cancelled:', err.message);
        } else {
          console.error('Request failed:', err);
          // Only navigate if the error was not a cancellation
          // Check for a 403 status code specifically
          if (err.response && err.response.status === 403) {
            navigate('/sign-in', { state: { from: location }, replace: true });
          }
        }
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
      // console.log('Cleanup: Cancelled any ongoing requests.');
    };
  }, [navigate, location, axiosPrivate]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get('/record/home-data', {
          signal: controller.signal,
        });

        if (isMounted) {
          // console.log(response.data);
          setMetrics(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Log for debugging purposes
          // console.log('Request cancelled:', err.message);
        } else {
          console.error('Request failed:', err);
          // Only navigate if the error was not a cancellation
          // Check for a 403 status code specifically
          if (err.response && err.response.status === 403) {
            navigate('/sign-in', { state: { from: location }, replace: true });
          }
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
      // console.log('Cleanup: Cancelled any ongoing requests.');
    };
  }, [navigate, location, axiosPrivate]);
  // const data = [
  //   { username: 'User_1', kgCO2e: 39.65, scope: 'Scope 1' },
  //   { username: 'User_2', kgCO2e: 75.5, scope: 'Scope 2' },
  //   { username: 'User_3', kgCO2e: 55.08, scope: 'Scope 1' },
  //   { username: 'User_4', kgCO2e: 75.08, scope: 'Scope 1' },
  //   { username: 'User_5', kgCO2e: 38.68, scope: 'Scope 2' },
  //   { username: 'User_6', kgCO2e: 76.14, scope: 'Scope 3' },
  //   { username: 'User_7', kgCO2e: 23.68, scope: 'Scope 1' },
  //   { username: 'User_8', kgCO2e: 45.19, scope: 'Scope 2' },
  //   { username: 'User_9', kgCO2e: 80.31, scope: 'Scope 2' },
  //   { username: 'User_10', kgCO2e: 75.14, scope: 'Scope 3' },
  // ];

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 p-4 md:pl-10 w-full h-full overflow-y-auto max-h-full max-w-full">
      <div className="flex flex-col lg:flex-row p-2 lg:p-5">
        <BoxCard
          title={'Total Carbon Emission'}
          value={metrics?.totalEmission || 0}
          unit={'kgCO2e'}
          Icon={TbSum}
          link="/main/total-carbon-emission"
        />
        <BoxCard
          title={'Yearly Change in Carbon Percentage'}
          value={metrics?.yearlyCarbonChange || 0}
          unit={'%'}
          Icon={GrCycle}
          link="/main/change-in-emission"
        />
        <BoxCard
          title={'Carbon Offset'}
          value={0}
          unit={'kgCO2e'}
          Icon={MdOutlineSsidChart}
          link="/main/offset"
        />
        <BoxCard
          title={'Carbon Footprint per Employee'}
          value={metrics?.avgEmissionPerEmployee || 0}
          unit={'average kgCO2e'}
          Icon={MdPeopleOutline}
          link="/main/employee-carbon"
        />
      </div>

      <div className="flex bg-slate-400 dark:bg-stone-800">
        <TableBox data={data} />
      </div>
    </div>
  );
};

export default Statistics;
