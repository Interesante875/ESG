import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';
import { BumpChartRenderer } from '../../components/Charts';

const ChangeInEmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear() - 1, 0, 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), 11, 31)
  ); // Current date one year ago
  const [bumpData, setBumpData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(
          '/record/total-emission-by-year',
          {
            startYear: startDate.toISOString(),
            endYear: endDate.toISOString(),
          },
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          // console.log(response.data);
          setBumpData(response.data.formattedOutput);
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
    if (endDate <= startDate) {
      alert('End date must be greater than or equal to start date.');
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(
          '/record/total-emission-by-year',
          {
            startYear: startDate.toISOString(),
            endYear: endDate.toISOString(),
          },
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          console.log(response.data);
          setBumpData(response.data.formattedOutput);
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
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full h-full overflow-y-auto">
      <form onSubmit={handleFilterSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
          <div>
            <label
              htmlFor="start-year"
              className="block text-sm font-medium mb-2"
            >
              Start Year
            </label>
            <DatePicker
              id="start-year"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showYearPicker
              dateFormat="yyyy"
              className="form-input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg p-1"
              calendarClassName="dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="end-year"
              className="block text-sm font-medium mb-2"
            >
              End Year
            </label>
            <DatePicker
              id="end-year"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showYearPicker
              dateFormat="yyyy"
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
        <BumpChartRenderer data={bumpData} />
      )}
    </div>
  );
};

export default ChangeInEmission;
