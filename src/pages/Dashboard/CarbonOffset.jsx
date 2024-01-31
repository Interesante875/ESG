import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
  BumpChartRenderer,
  ColumnChartRenderer,
} from '../../components/Charts';

const CarbonOffset = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  ); // January 1st of the current year
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  ); // Current date one year ago
  const [columnData, setColumnData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setColumnData([
      {
        country: 'AD',
        'hot dog': 99,
        'hot dogColor': 'hsl(285, 70%, 50%)',
        burger: 111,
        burgerColor: 'hsl(74, 70%, 50%)',
        sandwich: 29,
        sandwichColor: 'hsl(319, 70%, 50%)',
        kebab: 172,
        kebabColor: 'hsl(360, 70%, 50%)',
        fries: 139,
        friesColor: 'hsl(109, 70%, 50%)',
        donut: 95,
        donutColor: 'hsl(11, 70%, 50%)',
      },
      {
        country: 'AE',
        'hot dog': 181,
        'hot dogColor': 'hsl(267, 70%, 50%)',
        burger: 76,
        burgerColor: 'hsl(219, 70%, 50%)',
        sandwich: 69,
        sandwichColor: 'hsl(195, 70%, 50%)',
        kebab: 19,
        kebabColor: 'hsl(316, 70%, 50%)',
        fries: 200,
        friesColor: 'hsl(310, 70%, 50%)',
        donut: 3,
        donutColor: 'hsl(197, 70%, 50%)',
      },
      {
        country: 'AF',
        'hot dog': 152,
        'hot dogColor': 'hsl(352, 70%, 50%)',
        burger: 33,
        burgerColor: 'hsl(345, 70%, 50%)',
        sandwich: 4,
        sandwichColor: 'hsl(261, 70%, 50%)',
        kebab: 108,
        kebabColor: 'hsl(89, 70%, 50%)',
        fries: 186,
        friesColor: 'hsl(302, 70%, 50%)',
        donut: 93,
        donutColor: 'hsl(120, 70%, 50%)',
      },
      {
        country: 'AG',
        'hot dog': 17,
        'hot dogColor': 'hsl(352, 70%, 50%)',
        burger: 100,
        burgerColor: 'hsl(174, 70%, 50%)',
        sandwich: 99,
        sandwichColor: 'hsl(34, 70%, 50%)',
        kebab: 51,
        kebabColor: 'hsl(324, 70%, 50%)',
        fries: 164,
        friesColor: 'hsl(201, 70%, 50%)',
        donut: 159,
        donutColor: 'hsl(318, 70%, 50%)',
      },
      {
        country: 'AI',
        'hot dog': 159,
        'hot dogColor': 'hsl(253, 70%, 50%)',
        burger: 175,
        burgerColor: 'hsl(315, 70%, 50%)',
        sandwich: 143,
        sandwichColor: 'hsl(246, 70%, 50%)',
        kebab: 49,
        kebabColor: 'hsl(292, 70%, 50%)',
        fries: 66,
        friesColor: 'hsl(138, 70%, 50%)',
        donut: 62,
        donutColor: 'hsl(14, 70%, 50%)',
      },
      {
        country: 'AL',
        'hot dog': 119,
        'hot dogColor': 'hsl(156, 70%, 50%)',
        burger: 86,
        burgerColor: 'hsl(130, 70%, 50%)',
        sandwich: 19,
        sandwichColor: 'hsl(53, 70%, 50%)',
        kebab: 19,
        kebabColor: 'hsl(212, 70%, 50%)',
        fries: 25,
        friesColor: 'hsl(338, 70%, 50%)',
        donut: 195,
        donutColor: 'hsl(339, 70%, 50%)',
      },
      {
        country: 'AM',
        'hot dog': 112,
        'hot dogColor': 'hsl(339, 70%, 50%)',
        burger: 119,
        burgerColor: 'hsl(8, 70%, 50%)',
        sandwich: 95,
        sandwichColor: 'hsl(329, 70%, 50%)',
        kebab: 92,
        kebabColor: 'hsl(170, 70%, 50%)',
        fries: 55,
        friesColor: 'hsl(319, 70%, 50%)',
        donut: 152,
        donutColor: 'hsl(236, 70%, 50%)',
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
      setColumnData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full overflow-y-auto h-full">
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
        <ColumnChartRenderer data={columnData} />
      )}
    </div>
  );
};

export default CarbonOffset;
