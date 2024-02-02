import React, { useEffect, useState, useMemo } from 'react';
import { DateTime } from 'luxon';
import {
  TableEmployeeCommuting,
  TableStationaryCombustion,
} from '../../components/Table';
import { columnDefinition } from '../../components/Table/column';
import axios from 'axios';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import MOCK_DATA_Stationary_Fuels_3 from '../../fake_data/MOCK_DATA_Stationary_Fuels_3.json';

const ReportEmployeeCommuting = () => {
  // const data = MOCK_DATA_Stationary_Fuels_2;
  const column = columnDefinition;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'
  const [editableData, setEditableData] = useState({
    type: '',
    source: '',
    unit: '',
    quantity: '',
    location: '',
    description: '',
  });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [rowToDelete, setRowToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await axios.get('your-api-endpoint'); // Replace with your API endpoint
        // setData(response.data);
        setData(MOCK_DATA_Stationary_Fuels_3);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleAddNewClick = () => {
    setEditableData({
      type: '',
      source: '',
      unit: '',
      quantity: '',
      location: '',
      description: '',
    });
    setModalMode('add');
    setShowContentModal(true);
  };

  const handleDeleteClick = () => {
    if (selectedRows.size > 0) {
      setShowDeleteModal(true);
    } else {
      alert('No rows selected'); // Or show a more user-friendly message
    }
  };

  const requestRowDeletion = (rowId) => {
    setRowToDelete(rowId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      setData(data.filter((row) => row.id !== rowToDelete));
      setRowToDelete(null);
    }
    setShowDeleteModal(false); // Close the modal
  };

  const deleteSelectedRows = () => {
    const newData = data.filter((row) => !selectedRows.has(row.id));
    setData(newData);
    setSelectedRows(new Set()); // Clear selected rows after deletion
    setShowDeleteModal(false); // Close the modal
  };

  // Function to handle edit requests
  const handleEditClick = (rowData) => {
    setEditableData(rowData);
    setModalMode('edit');
    setShowContentModal(true);
  };

  const handleAddNewSubmit = (event) => {
    event.preventDefault();
    if (modalMode === 'edit') {
      // Update existing data
      const updatedData = data.map((item) =>
        item.id === editableData.id ? { ...editableData } : item
      );
      setShowContentModal(false);
      setData(updatedData);
    } else if (modalMode === 'add') {
      const newEntry = {
        ...editableData,
        id: Math.max(0, ...data.map((d) => d.id)) + 1, // Generate new ID
        createdBy: 'currentUser', // Replace with actual user identifier if available
        createdAt: DateTime.now().toISO(), // Current timestamp
      };

      setData([...data, newEntry]);
      setShowContentModal(false);
      setEditableData({
        type: '',
        source: '',
        unit: '',
        quantity: '',
        location: '',
        description: '',
      }); // Reset form
    }
  };

  function sourceOption() {
    const flights = [
      'Average Passenger',
      'Economy Class',
      'Premium Economy Class',
      'Business Class',
      'First Class',
    ];
    const ferry = ['Foot Passenger', 'Car Passenger', 'Bus Passenger'];
    const land = [
      'Mini-sized Car',
      'Medium-sized Car',
      'Large-sized Car',
      'Average-sized Car',
      'Mini-sized Motorcycle',
      'Medium-sized Motorcycle',
      'Large-sized Motorcycle',
      'Average-sized Motorcycle',
      'Taxi/E-hailing',
      'Bus',
      'Monorail',
      'LRT',
      'MRT',
    ];

    switch (editableData.type) {
      case 'Air':
        return flights;
      case 'Sea':
        return ferry;
      case 'Land':
        return land;
      default:
        return land;
    }
  }

  function unitOption() {
    const land = ['Kilometres', 'Miles'];
    const sea = ['Passenger per km', 'Passenger per Nautical miles'];
    const air = ['Kilometres', 'Miles', 'Nautical miles'];

    if (editableData.type.includes('Air')) {
      return air;
    } else if (editableData.type.includes('Sea')) {
      return sea;
    } else {
      return land;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 dark:text-white">
          Employee Commuting Reporting
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleAddNewClick}
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 transition duration-300 w-40"
            aria-label="Add new item"
          >
            <FiPlus className="mr-2" />
            <span className="flex-1 text-center">Add</span>
          </button>
          <button
            onClick={handleDeleteClick}
            className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-800 transition duration-300 w-40"
            aria-label="Delete selected items"
          >
            <FiTrash className="mr-2" />
            <span className="flex-1 text-center">Delete</span>
          </button>
        </div>
      </div>
      {/* {showContentModal && <MyModal onClose={() => setShowContentModal(false)} />} */}
      <TableEmployeeCommuting
        data={data}
        columns={column}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRequestDelete={requestRowDeletion}
        onEdit={handleEditClick}
      />
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md mx-auto rounded shadow-lg overflow-hidden p-4">
            <p className="text-gray-800 dark:text-gray-200 text-center text-lg md:text-base">
              Are you sure you want to delete the selected items?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 dark:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded mr-2 text-sm md:text-base hover:bg-gray-400 dark:hover:bg-gray-700 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  rowToDelete !== null ? confirmDelete() : deleteSelectedRows()
                }
                className="bg-red-500 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-red-600 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg mx-auto rounded shadow-lg overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add New Data</h2>
            <form onSubmit={handleAddNewSubmit}>
              {/* Type Dropdown */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.type}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      type: e.target.value,
                      source: '',
                      unit: '',
                    })
                  }
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Air">Employee Commuting - Air</option>
                  <option value="Sea">Employee Commuting - Sea</option>
                  <option value="Land">Employee Commuting - Land</option>
                </select>
              </div>

              {/* Source Dropdown */}
              {editableData.type && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Source
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={editableData.source}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        source: e.target.value,
                        unit: '',
                      })
                    }
                    required
                  >
                    <option value="">Select Source</option>
                    {sourceOption().map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Unit Dropdown */}
              {editableData.source && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Unit
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={editableData.unit}
                    onChange={(e) =>
                      setEditableData({ ...editableData, unit: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Unit</option>
                    {unitOption().map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Other Fields */}
              {/* Quantity Input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </label>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.quantity}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      quantity: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Location Input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.location}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      location: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.description}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowContentModal(false)}
                  className="bg-gray-300 dark:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportEmployeeCommuting;
