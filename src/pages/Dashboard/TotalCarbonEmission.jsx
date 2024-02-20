import { PieChartRenderer } from '../../components/Charts';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';

const TotalCarbonEmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(
          '/record/total-emission-by-scope',
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          setPieData([
            {
              id: 'Scope I',
              label: 'Scope I',
              value: response.data?.totalEmissionsByScope['1'] || 0,
              color: 'hsl(324, 70%, 50%)',
            },
            {
              id: 'Scope II',
              label: 'Scope II',
              value: response.data?.totalEmissionsByScope['2'] || 0,
              color: 'hsl(353, 70%, 50%)',
            },
            {
              id: 'Scope III',
              label: 'Scope III',
              value: response.data?.totalEmissionsByScope['3'] || 0,
              color: 'hsl(99, 70%, 50%)',
            },
          ]);
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
  }, [navigate, location, axiosPrivate, startDate, endDate]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    if (endDate < startDate) {
      alert('End date must be greater than or equal to start date.');
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(
          '/record/total-emission-by-scope',
          {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          setPieData([
            {
              id: 'Scope I',
              label: 'Scope I',
              value: response.data?.totalEmissionsByScope['1'] || 0,
              color: 'hsl(324, 70%, 50%)',
            },
            {
              id: 'Scope II',
              label: 'Scope II',
              value: response.data?.totalEmissionsByScope['2'] || 0,
              color: 'hsl(353, 70%, 50%)',
            },
            {
              id: 'Scope III',
              label: 'Scope III',
              value: response.data?.totalEmissionsByScope['3'] || 0,
              color: 'hsl(99, 70%, 50%)',
            },
          ]);
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
  };

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full overflow-y-auto h-full">
      <form onSubmit={handleFilterSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium mb-2"
            >
              Start Date
            </label>
            <DatePicker
              id="start-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg p-1"
              calendarClassName="dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium mb-2"
            >
              End Date
            </label>
            <DatePicker
              id="end-date"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg p-1"
              calendarClassName="dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
      {isLoading ? (
        <div className="text-center py-10">
          <span>Loading...</span>{' '}
          {/* Replace with a spinner or similar loading indicator */}
        </div>
      ) : (
        <PieChartRenderer data={pieData} />
      )}
    </div>
  );
};

export default TotalCarbonEmission;
