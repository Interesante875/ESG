import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/Help/Searchbar';
import Fuse from 'fuse.js';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiPlusCircle,
  FiTrash,
} from 'react-icons/fi';
import { FaChessKing } from 'react-icons/fa';

import UserItem from '../../components/Dashboard/UserItem';
import UserModal from '../../components/Dashboard/UserModal';
import usersData from '../../fake_data/MOCK_DATA_User_List_2.json';
import { columnDefinitionUsers } from '../../components/Table/column';
import { TableUserList } from '../../components/Table';

const UsersList = () => {
  const column = columnDefinitionUsers;
  const companyName = 'TranXEnergy Inc';

  const [data, setData] = useState([]);
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

  // Initialize Fuse with the list of users and the options for fuzzy search
  const fuse = new Fuse(usersData, {
    keys: ['username', 'name', 'email', 'userRole'],
    includeScore: true,
  });

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const results = fuse.search(searchTerm).map((result) => result.item);
      setData(results);
    } else {
      setData(usersData); // Reset to original data if search term is cleared
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await axios.get('your-api-endpoint'); // Replace with your API endpoint
        // setData(response.data);
        setData(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
      setShowContentModal(false);
      setData(updatedData);
    } else if (modalMode === 'add') {
      if (editableData.password !== editableData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const newEntry = {
        ...editableData,
        id: Math.max(0, ...data.map((d) => d.id)) + 1, // Generate new ID
      };

      setData([...data, newEntry]);
      setShowContentModal(false);
      setEditableData({
        username: '',
        name: '',
        email: '',
        gender: '',
        userRole: '',
      }); // Reset form
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

// const UsersList = () => {
//   const companyName = 'TranXEnergy Inc';
//   const data = usersData;
//   const upperUserLimit = 10;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchResults, setSearchResults] = useState(data);
//   const [itemsPerPage, setItemsPerPage] = useState(4);
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;
//   const currentItems = searchResults.slice(firstIndex, lastIndex);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   const openModal = (user) => {
//     setCurrentUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentUser(null);
//   };

//   const truncateText = (text, maxLength) =>
//     text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

//   const goToPage = (pageNum) => {
//     if (pageNum < 1) setCurrentPage(1);
//     else if (pageNum > totalPages) setCurrentPage(totalPages);
//     else setCurrentPage(pageNum);
//   };

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'ArrowLeft') {
//         goToPage(currentPage - 1);
//       } else if (e.key === 'ArrowRight') {
//         goToPage(currentPage + 1);
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [currentPage, totalPages]);

//   useEffect(() => {
//     const checkAspectRatio = () => {
//       const aspectRatio = window.innerWidth / window.innerHeight;
//       if (window.innerHeight <= 650) {
//         setItemsPerPage(4);
//       } else if (window.innerHeight <= 750) {
//         setItemsPerPage(5);
//       } else if (window.innerHeight <= 920) {
//         setItemsPerPage(8);
//       } else if (window.innerHeight <= 1000) {
//         setItemsPerPage(9);
//       } else if (window.innerHeight <= 1200) {
//         setItemsPerPage(12);
//       }
//       // setItemsPerPage(aspectRatio < 1 ? 6 : 4); // Display more items if height > width
//     };

//     checkAspectRatio(); // Check on component mount
//     window.addEventListener('resize', checkAspectRatio); // Adjust on window resize
//     return () => window.removeEventListener('resize', checkAspectRatio);
//   }, []);

//   const fuse = new Fuse(data, {
//     keys: ['username', 'name'],
//     includeScore: true,
//   });

//   const handleSearch = (query) => {
//     if (query) {
//       setSearchResults(fuse.search(query).map((result) => result.item));
//     } else {
//       setSearchResults(data);
//     }
//     setCurrentPage(1);
//   };

//   // Function to update a user's role
//   const updateUser = (updatedUser) => {
//     setSearchResults((prevUsers) =>
//       prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//     );
//   };

//   // Function to delete a user
//   const deleteUser = (userId) => {
//     setSearchResults((prevUsers) =>
//       prevUsers.filter((user) => user.id !== userId)
//     );
//   };

//   return (
//     <div className="flex flex-col bg-slate-400 dark:bg-stone-800 w-full p-4 h-full">
//       <div className="flex flex-row pb-3">
//         <h2 className="hidden md:flex text-xl text-gray-800 dark:text-gray-100 font-semibold items-center pr-5">
//           {companyName}
//           <FaChessKing
//             className="hidden md:flex ml-5 text-amber-900 dark:text-amber-200"
//             size={25}
//           />
//         </h2>
//         <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold flex items-center pr-5">
//           Total Company User: {data.length}/{upperUserLimit}
//         </p>
//         <button className="text-sm text-gray-800 dark:text-gray-800 font-semibold flex items-center px-4 py-2 bg-amber-300 dark:bg-amber-200 dark:hover:bg-amber-400 hover:bg-blue-600 rounded-md transition duration-300 ease-in-out">
//           <FiPlusCircle className="mr-2" />
//           Create New User
//         </button>
//       </div>
//       <div className="flex flex-col h-full">
//         <SearchBar onSearch={handleSearch} />
//         <div className="flex flex-col h-full overflow-auto w-full">
//           <table className="min-w-full text-gray-800 dark:text-gray-100">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700">
//                 <th className="px-4 py-3 text-left">Display Name</th>
//                 <th className="px-4 py-3 text-left hidden md:table-cell">
//                   Full Name
//                 </th>
//                 <th className="px-4 py-3 text-left hidden md:table-cell">
//                   Position
//                 </th>
//                 <th className="px-4 py-3 text-left hidden md:table-cell">
//                   Gender
//                 </th>
//                 <th className="px-4 py-3 text-left">User Role</th>
//                 <th className="px-4 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="z-1">
//               {currentItems.map((user) => (
//                 <UserItem
//                   key={user.id}
//                   user={user}
//                   openModal={() => openModal(user)}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <UserModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         user={currentUser}
//         updateUser={updateUser}
//         deleteUser={deleteUser}
//       />

//       <div className="flex justify-between items-center mt-4">
//         <FiChevronLeft
//           className="cursor-pointer dark:text-white"
//           onClick={() => goToPage(currentPage - 1)}
//           title="Previous Page"
//         />
//         <span className="dark:text-white">
//           Page {currentPage} of {totalPages}
//         </span>
//         <FiChevronRight
//           className="cursor-pointer dark:text-white"
//           onClick={() => goToPage(currentPage + 1)}
//           title="Next Page"
//         />
//       </div>
//     </div>
//   );
// };

export default UsersList;
