import React, { useEffect, useState } from 'react';
import { TableFugitiveEmission } from '../../components/Table';
import { columnDefinition } from '../../components/Table/column';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';

const ReportFugitiveEmission = () => {
  const column = columnDefinition;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

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
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(
          'record/read-records/scope/1/category/fugitiveEmission',
          {
            signal: controller.signal,
          }
        );

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

  const confirmDelete = async () => {
    if (rowToDelete !== null) {
      let isMounted = true;
      const controller = new AbortController();

      try {
        await axiosPrivate.delete(`/record/delete-record/${rowToDelete}`, {
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        });

        if (isMounted) {
          // Update the state to reflect the deletion
          setData((prevData) =>
            prevData.filter((row) => row.id !== rowToDelete)
          );
          setRowToDelete(null);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Deletion failed:', err);
          if (err.response) {
            // Redirect on 403 Forbidden or show an error message
            if (err.response.status === 403) {
              navigate('/sign-in', {
                state: { from: location },
                replace: true,
              });
            } else {
              alert(
                `Error: ${err.response.data.message || 'An error occurred.'}`
              );
            }
          }
        }
      } finally {
        if (isMounted) {
          setShowDeleteModal(false); // Close the modal upon completion or error
        }
      }

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted = false;
        controller.abort();
      };
    } else {
      // If rowToDelete is null, just close the modal
      setShowDeleteModal(false);
    }
  };

  const deleteSelectedRows = async () => {
    // Check if any rows are selected for deletion
    if (selectedRows.size > 0) {
      let isMounted = true;
      const controller = new AbortController();

      try {
        const recordIdsToDelete = Array.from(selectedRows);

        await axiosPrivate.delete('/record/delete-records', {
          data: { ids: recordIdsToDelete }, // Sending user IDs in the request body
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        });

        if (isMounted) {
          // Filter out the deleted users from the current data
          setData((prevData) =>
            prevData.filter((row) => !selectedRows.has(row.id))
          );
          setSelectedRows(new Set()); // Clear selected rows after successful deletion
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Deletion failed:', err);
          if (err.response) {
            // Handle specific HTTP status codes here
            if (err.response.status === 403) {
              navigate('/sign-in', {
                state: { from: location },
                replace: true,
              });
            } else {
              alert(
                `Error: ${err.response.data.message || 'An error occurred.'}`
              );
            }
          }
        }
      } finally {
        if (isMounted) {
          setShowDeleteModal(false); // Close the modal upon completion or error
        }
      }

      // Cleanup function to prevent state updates if the component unmounts
      return () => {
        isMounted = false;
        controller.abort();
      };
    } else {
      // If no rows were selected, just close the modal
      setShowDeleteModal(false);
    }
  };

  // Function to handle edit requests
  const handleEditClick = (rowData) => {
    setEditableData(rowData);
    setModalMode('edit');
    setShowContentModal(true);
  };

  const handleAddNewSubmit = async (event) => {
    event.preventDefault();

    const endpoint =
      modalMode === 'edit'
        ? `/record/edit-record/${editableData.id}`
        : '/record/create-record';
    const method = modalMode === 'edit' ? 'patch' : 'post';

    // Prepare the data payload
    const payload = {
      scope: 1,
      category: 'fugitiveEmission',
      type: editableData.type,
      source: editableData.source,
      unit: editableData.unit,
      quantity: editableData.quantity,
      location: editableData.location,
      description: editableData.description,
    };

    try {
      const response = await axiosPrivate[method](endpoint, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Update the state based on the modal mode
      if (modalMode === 'edit') {
        setData((currentData) =>
          currentData.map((item) =>
            item.id === editableData.id ? { ...item, ...response.data } : item
          )
        );
      } else {
        setData((currentData) => [...currentData, response.data]);
      }

      // Reset form and close modal
      setEditableData({
        type: '',
        source: '',
        unit: '',
        quantity: '',
        location: '',
        description: '',
      });
      setShowContentModal(false);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Submission failed:', err);
        const errorMsg = err.response?.data.message || 'An error occurred.';
        if (err.response?.status === 403) {
          navigate('/sign-in', { state: { from: location }, replace: true });
        } else {
          alert(`Error: ${errorMsg}`);
        }
      }
    }
  };

  function sourceOption() {
    const kyoto = [
      'Carbon dioxide',
      'Methane',
      'Nitrous oxide',
      'HFC-23',
      'HFC-32',
      'HFC-41',
      'HFC-125',
      'HFC-134',
      'HFC-134a',
      'HFC-143',
      'HFC-143a',
      'HFC-152a',
      'HFC-227ea',
      'HFC-236fa',
      'HFC-245fa',
      'HFC-43-I0mee',
      'Perfluoromethane (PFC-14)',
      'Perfluoroethane (PFC-116)',
      'Perfluoropropane (PFC-218)',
      'Perfluorocyclobutane (PFC-318)',
      'Perfluorobutane (PFC-3-1-10)',
      'Perfluoropentane (PFC-4-1-12)',
      'Perfluorohexane (PFC-5-1-14)',
      'PFC-9-1-18',
      'Perfluorocyclopropane',
      'Sulphur hexafluoride (SF6)',
      'HFC-152',
      'HFC-161',
      'HFC-236cb',
      'HFC-236ea',
      'HFC-245ca',
      'HFC-365mfc',
      'Nitrogen trifluoride',
    ];
    const blends = [
      'R401A',
      'R401B',
      'R401C',
      'R402A',
      'R402B',
      'R403A',
      'R403B',
      'R404A',
      'R405A',
      'R406A',
      'R407A',
      'R407B',
      'R407C',
      'R407D',
      'R407E',
      'R407F',
      'R408A',
      'R409A',
      'R409B',
      'R410A',
      'R410B',
      'R411A',
      'R411B',
      'R412A',
      'R413A',
      'R414A',
      'R414B',
      'R415A',
      'R415B',
      'R416A',
      'R417A',
      'R417B',
      'R417C',
      'R418A',
      'R419A',
      'R419B',
      'R420A',
      'R421A',
      'R421B',
      'R422A',
      'R422B',
      'R422C',
      'R422D',
      'R422E',
      'R423A',
      'R424A',
      'R425A',
      'R426A',
      'R427A',
      'R428A',
      'R429A',
      'R430A',
      'R431A',
      'R432A',
      'R433A',
      'R433B',
      'R433C',
      'R434A',
      'R435A',
      'R436A',
      'R436B',
      'R437A',
      'R438A',
      'R439A',
      'R440A',
      'R441A',
      'R442A',
      'R443A',
      'R444A',
      'R445A',
      'R500',
      'R501',
      'R502',
      'R503',
      'R504',
      'R505',
      'R506',
      'R507A',
      'R508A',
      'R508B',
      'R509A',
      'R510A',
      'R511A',
      'R512A',
    ];
    const montreal = [
      'CFC-11/R11 = trichlorofluoromethane',
      'CFC-12/R12 = dichlorodifluoromethane',
      'CFC-13',
      'CFC-113',
      'CFC-114',
      'CFC-115',
      'Halon-1211',
      'Halon-1301',
      'Halon-2402',
      'Carbon tetrachloride',
      'Methyl bromide',
      'Methyl chloroform',
      'HCFC-22/R22 = chlorodifluoromethane',
      'HCFC-123',
      'HCFC-124',
      'HCFC-141b',
      'HCFC-142b',
      'HCFC-225ca',
      'HCFC-225cb',
      'HCFC-21',
    ];
    const fluorinated = [
      'HFE-125',
      'HFE-134',
      'HFE-143a',
      'HCFE-235da2',
      'HFE-245cb2',
      'HFE-245fa2',
      'HFE-254cb2',
      'HFE-347mcc3',
      'HFE-347pcf2',
      'HFE-356pcc3',
      'HFE-449sl (HFE-7100)',
      'HFE-569sf2 (HFE-7200)',
      'HFE-43-10pccc124 (H-Galden1040x)',
      'HFE-236ca12 (HG-10)',
      'HFE-338pcc13 (HG-01)',
    ];
    const other = [
      'Trifluoromethyl sulphur pentafluoride',
      'PFPMIE',
      'Dimethylether',
      'Methylene chloride',
      'Methyl chloride',
      'R290 = propane',
      'R600A = isobutane',
      'R600 = butane',
      'R601 = pentane',
      'R601A = isopentane',
      'R170 = ethane',
      'R1270 = propene',
      'R1234yf*',
      'R1234ze*',
    ];

    switch (editableData.type) {
      case 'Kyoto Protocol Products':
        return kyoto;
      case 'Blends':
        return blends;
      case 'Montreal Protocol Products':
        return montreal;
      case 'Fluorinated Ethers':
        return fluorinated;
      case 'Other Products':
        return other;
      default:
        return kyoto;
    }
  }

  function unitOption() {
    if (editableData.type !== '') {
      return ['Grams', 'Kilograms'];
    }
  }

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 dark:text-white">
          Fugitive Emission Reporting
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
      <TableFugitiveEmission
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
            <h2 className="text-lg font-semibold mb-4">
              {modalMode === 'edit' ? 'Edit Data' : 'Add New Data'}
            </h2>
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
                  <option value="" disabled hidden>
                    Select Type
                  </option>
                  <option value="Kyoto Protocol Products">
                    Kyoto Protocol Products
                  </option>
                  <option value="Blends">Blends</option>
                  <option value="Montreal Protocol Products">
                    Montreal Protocol Products
                  </option>
                  <option value="Fluorinated Ethers">Fluorinated Ethers</option>
                  <option value="Other Products">Other Products</option>
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

export default ReportFugitiveEmission;
