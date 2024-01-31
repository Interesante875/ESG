import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BumpChartRenderer } from '../../components/Charts';

const ChangeInEmission = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  ); // January 1st of the current year
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  ); // Current date one year ago
  const [bumpData, setBumpData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('your-api-endpoint', {
    //       params: {
    //         startDate: startDate.toISOString(),
    //         endDate: endDate.toISOString(),
    //       },
    //     });
    //     setPieData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
    setBumpData([
      {
        id: 'Serie 1',
        data: [
          {
            x: 2000,
            y: 8,
          },
          {
            x: 2001,
            y: 10,
          },
          {
            x: 2002,
            y: 9,
          },
          {
            x: 2003,
            y: 8,
          },
          {
            x: 2004,
            y: 10,
          },
        ],
      },
      {
        id: 'Serie 2',
        data: [
          {
            x: 2000,
            y: 5,
          },
          {
            x: 2001,
            y: 1,
          },
          {
            x: 2002,
            y: 2,
          },
          {
            x: 2003,
            y: 12,
          },
          {
            x: 2004,
            y: 8,
          },
        ],
      },
      {
        id: 'Serie 3',
        data: [
          {
            x: 2000,
            y: 3,
          },
          {
            x: 2001,
            y: 2,
          },
          {
            x: 2002,
            y: 8,
          },
          {
            x: 2003,
            y: 1,
          },
          {
            x: 2004,
            y: 11,
          },
        ],
      },
      {
        id: 'Serie 4',
        data: [
          {
            x: 2000,
            y: 9,
          },
          {
            x: 2001,
            y: 5,
          },
          {
            x: 2002,
            y: 7,
          },
          {
            x: 2003,
            y: 10,
          },
          {
            x: 2004,
            y: 12,
          },
        ],
      },
      {
        id: 'Serie 5',
        data: [
          {
            x: 2000,
            y: 10,
          },
          {
            x: 2001,
            y: 12,
          },
          {
            x: 2002,
            y: 11,
          },
          {
            x: 2003,
            y: 9,
          },
          {
            x: 2004,
            y: 4,
          },
        ],
      },
      {
        id: 'Serie 6',
        data: [
          {
            x: 2000,
            y: 12,
          },
          {
            x: 2001,
            y: 9,
          },
          {
            x: 2002,
            y: 12,
          },
          {
            x: 2003,
            y: 2,
          },
          {
            x: 2004,
            y: 9,
          },
        ],
      },
      {
        id: 'Serie 7',
        data: [
          {
            x: 2000,
            y: 6,
          },
          {
            x: 2001,
            y: 3,
          },
          {
            x: 2002,
            y: 4,
          },
          {
            x: 2003,
            y: 6,
          },
          {
            x: 2004,
            y: 7,
          },
        ],
      },
      {
        id: 'Serie 8',
        data: [
          {
            x: 2000,
            y: 11,
          },
          {
            x: 2001,
            y: 8,
          },
          {
            x: 2002,
            y: 3,
          },
          {
            x: 2003,
            y: 5,
          },
          {
            x: 2004,
            y: 5,
          },
        ],
      },
      {
        id: 'Serie 9',
        data: [
          {
            x: 2000,
            y: 2,
          },
          {
            x: 2001,
            y: 7,
          },
          {
            x: 2002,
            y: 5,
          },
          {
            x: 2003,
            y: 3,
          },
          {
            x: 2004,
            y: 2,
          },
        ],
      },
      {
        id: 'Serie 10',
        data: [
          {
            x: 2000,
            y: 1,
          },
          {
            x: 2001,
            y: 4,
          },
          {
            x: 2002,
            y: 6,
          },
          {
            x: 2003,
            y: 4,
          },
          {
            x: 2004,
            y: 3,
          },
        ],
      },
      {
        id: 'Serie 11',
        data: [
          {
            x: 2000,
            y: 4,
          },
          {
            x: 2001,
            y: 6,
          },
          {
            x: 2002,
            y: 10,
          },
          {
            x: 2003,
            y: 11,
          },
          {
            x: 2004,
            y: 1,
          },
        ],
      },
    ]);
  }, [startDate, endDate]);

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    if (endDate < startDate) {
      alert('End date must be greater than or equal to start date.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('/your-endpoint', {
        params: { start: startDate, end: endDate },
      });
      setBumpData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
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
