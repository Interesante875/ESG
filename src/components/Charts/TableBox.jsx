import React from 'react';
import PropTypes from 'prop-types';

const TableBox = ({ data }) => {
  return (
    <div
      className="bg-slate-200 dark:bg-gray-700 shadow-md rounded-lg pb-4 lg:mx-9 mx-2 mb-3 w-full max-w-4xl overflow-y-auto no-scrollbar"
      style={{ maxHeight: '400px' }}
    >
      <table className="min-w-full w-full h-full text-gray-800 dark:text-gray-200 border-collapse py-4">
        <thead className="sticky top-0 bg-slate-300 dark:bg-gray-900 shadow-md rounded-xl p-4 mt-0">
          <tr>
            <th className="px-4 py-2 text-left font-semibold border-b border-gray-300 dark:border-gray-600">
              Username
            </th>
            <th className="px-4 py-2 text-left font-semibold border-b border-gray-300 dark:border-gray-600">
              kgCO2e
            </th>
            <th className="px-4 py-2 text-left font-semibold border-b border-gray-300 dark:border-gray-600">
              Scope
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t border-gray-300 dark:border-gray-600 min-h-12"
            >
              <td className="px-4 py-2">{row.username}</td>
              <td className="px-4 py-2">{row.kgCO2e}</td>
              <td className="px-4 py-2">{row.scope}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      kgCO2e: PropTypes.number.isRequired,
      scope: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBox;
