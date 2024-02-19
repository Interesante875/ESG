import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { FiEye, FiEyeOff, FiPlus, FiTrash } from 'react-icons/fi';

import usersData from '../../fake_data/MOCK_DATA_User_List_2.json';
import { columnDefinitionUsers } from '../../components/Table/column';
import { TableUserList } from '../../components/Table';

import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const UsersList = () => {
  const column = columnDefinitionUsers;

  const { auth } = useAuth();
  const companyName = auth.companyName;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'

  const [editableData, setEditableData] = useState({
    username: '',
    name: '',
    email: '',
    gender: '',
    userRole: '',
  });
  const [tempShowPassword, setTempShowPassword] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [rowToDelete, setRowToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get('/user/get-users', {
          signal: controller.signal,
        });

        if (isMounted) {
          setData(response.data);
          setSearchResults(response.data);
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

  // Filter data based on search term
  useEffect(() => {
    // Initialize Fuse with the list of users and the options for fuzzy search
    const fuse = new Fuse(data, {
      keys: ['username', 'name', 'email', 'userRole'],
      includeScore: true,
    });

    if (searchTerm.trim().length > 0) {
      const results = fuse.search(searchTerm).map((result) => result.item);
      setSearchResults(results);
    } else {
      setSearchResults(data); // Reset to original data if search term is cleared
    }
  }, [searchTerm, data]);

  const handleAddNewClick = () => {
    setEditableData({
      username: '',
      name: '',
      email: '',
      gender: '',
      userRole: '',
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
        // Assuming you want to DELETE the user, not PATCH
        await axiosPrivate.delete(`/user/delete-user/${rowToDelete}`, {
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
        // Convert selectedRows Set to an array of user IDs
        const userIdsToDelete = Array.from(selectedRows);

        await axiosPrivate.delete('/user/delete-users', {
          data: { userIds: userIdsToDelete }, // Sending user IDs in the request body
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

    if (
      editableData.username.trim().length < 3 ||
      editableData.name.trim().length < 3
    ) {
      alert('Username and Name must be at least 3 characters long');
      return;
    }

    if (modalMode === 'edit') {
      // Update existing data
      const updatedData = data.map((item) =>
        item.id === editableData.id ? { ...editableData } : item
      );

      let isMounted = true;
      const controller = new AbortController();

      try {
        const response = await axiosPrivate.patch(
          `/user/update-user/${editableData.id}`,
          {
            username: editableData.username,
            fullName: editableData.name,
            gender: editableData.gender,
            userRole: editableData.userRole,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          }
        );

        if (isMounted) {
          setShowContentModal(false);
          // Reset form fields after successful add/edit
          setEditableData({
            username: '',
            name: '',
            email: '',
            gender: '',
            userRole: '',
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          console.error('Submission failed:', err);
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
      }

      setShowContentModal(false);
      setData(updatedData);

      return () => {
        isMounted = false;
        controller.abort();
      };
    } else if (modalMode === 'add') {
      if (editableData.password !== editableData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // const newEntry = {
      //   ...editableData,
      //   id: Math.max(0, ...data.map((d) => d.id)) + 1, // Generate new ID
      // };

      // setData([...data, newEntry]);

      let isMounted = true;

      const controller = new AbortController();

      try {
        const values = {
          username: editableData.username,
          email: editableData.email,
          gender: editableData.gender,
          fullName: editableData.name,
          password: editableData.password,
          confirmPassword: editableData.confirmPassword,
          userRole: editableData.userRole,
        };

        console.log(values);

        const response = await axiosPrivate.post(
          '/company/invite-user',
          values,
          {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          }
        );

        if (isMounted) {
          // console.log(response.data);
          setShowContentModal(false);
          setEditableData({
            username: '',
            name: '',
            email: '',
            gender: '',
            userRole: '',
          }); // Reset form
          // Handle successful submission (e.g., showing a success message, navigating to another page)
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          console.error('Submission failed:', err);
          // Handle errors (e.g., showing error message, navigating on certain conditions)
          if (err.response) {
            const statusCode = err.response.status;
            if (statusCode === 403) {
              // Token has expired, redirect to sign-in page
              navigate('/sign-in', {
                state: { from: location },
                replace: true,
              });
            } else {
              // Handle other errors here
              console.error('Other error occurred:', err.response.data);
            }
          }
        }
      }

      return () => {
        isMounted = false;
        controller.abort();
      };
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  function sourceOption() {}

  function unitOption() {}

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 text-black dark:text-white p-4 md:p-10 w-full overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0 dark:text-white">
          {companyName}
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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      {/* {showContentModal && <MyModal onClose={() => setShowContentModal(false)} />} */}
      <TableUserList
        data={searchResults}
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
              {modalMode === 'edit' ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={handleAddNewSubmit}>
              {/* Username Input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.username}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      username: e.target.value,
                    })
                  }
                  required
                  minLength={3}
                />
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.name}
                  onChange={(e) =>
                    setEditableData({ ...editableData, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email Input - Editable only in 'add' mode */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.email}
                  onChange={(e) =>
                    setEditableData({ ...editableData, email: e.target.value })
                  }
                  readOnly={modalMode === 'edit'}
                  required
                />
              </div>

              {/* Password Fields - Only in 'add' mode */}
              {modalMode === 'add' && (
                <>
                  <div className="mb-4 relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={tempShowPassword ? 'text' : 'password'}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-2.5 pr-10 h-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        value={editableData.password}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 h-full text-sm text-gray-600 dark:text-gray-400"
                        onMouseDown={() => setTempShowPassword(true)}
                        onMouseUp={() => setTempShowPassword(false)}
                        onMouseLeave={() => setTempShowPassword(false)}
                      >
                        {tempShowPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      value={editableData.confirmPassword}
                      onChange={(e) =>
                        setEditableData({
                          ...editableData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    {editableData.password !== editableData.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        Passwords do not match.
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Gender Dropdown */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.gender}
                  onChange={
                    (e) =>
                      setEditableData({
                        ...editableData,
                        gender: e.target.value.toLowerCase(),
                      }) // Normalize the value to lower case
                  }
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* UserRole Dropdown */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Role
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={editableData.userRole}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      userRole: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="standard">Standard</option>
                </select>
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

export default UsersList;
