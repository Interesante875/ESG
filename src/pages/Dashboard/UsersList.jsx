import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/Help/Searchbar';
import Fuse from 'fuse.js';
import { FiChevronLeft, FiChevronRight, FiPlusCircle } from 'react-icons/fi';
import { FaChessKing } from 'react-icons/fa';

import UserItem from '../../components/Dashboard/UserItem';
import UserModal from '../../components/Dashboard/UserModal';

const usersData = [
  {
    id: 1,
    username: 'JohnSmith',
    name: 'John Smith',
    position: 'Software Engineer',
    gender: 'Male',
    role: 'Editor',
  },
  {
    id: 2,
    username: 'SarahJones',
    name: 'Sarah Jones',
    position: 'Product Manager',
    gender: 'Female',
    role: 'Admin',
  },
  {
    id: 3,
    username: 'MikeBrown',
    name: 'Mike Brown',
    position: 'UI/UX Designer',
    gender: 'Male',
    role: 'Viewer',
  },
  {
    id: 4,
    username: 'EmmaWilson',
    name: 'Emma Wilson',
    position: 'Quality Assurance',
    gender: 'Female',
    role: 'Editor',
  },
  {
    id: 5,
    username: 'DavidJohnson',
    name: 'David Johnson',
    position: 'DevOps Engineer',
    gender: 'Male',
    role: 'Admin',
  },
  {
    id: 6,
    username: 'SophiaDavis',
    name: 'Sophia Davis',
    position: 'Data Scientist',
    gender: 'Female',
    role: 'Viewer',
  },
  {
    id: 7,
    username: 'JamesGarcia',
    name: 'James Garcia',
    position: 'Project Manager',
    gender: 'Male',
    role: 'Editor',
  },
  {
    id: 8,
    username: 'IsabellaMartinez',
    name: 'Isabella Martinez',
    position: 'Frontend Developer',
    gender: 'Female',
    role: 'Admin',
  },
  {
    id: 9,
    username: 'WilliamRodriguez',
    name: 'William Rodriguez',
    position: 'Backend Developer',
    gender: 'Male',
    role: 'Viewer',
  },
  {
    id: 10,
    username: 'OliviaHernandez',
    name: 'Olivia Hernandez',
    position: 'Graphic Designer',
    gender: 'Female',
    role: 'Editor',
  },
];

const UsersList = () => {
  const companyName = 'TranXEnergy Inc';
  const data = usersData;
  const upperUserLimit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(data);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = searchResults.slice(firstIndex, lastIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  const goToPage = (pageNum) => {
    if (pageNum < 1) setCurrentPage(1);
    else if (pageNum > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(pageNum);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPage(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        goToPage(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      if (window.innerHeight <= 650) {
        setItemsPerPage(4);
      } else if (window.innerHeight <= 750) {
        setItemsPerPage(5);
      } else if (window.innerHeight <= 920) {
        setItemsPerPage(8);
      } else if (window.innerHeight <= 1000) {
        setItemsPerPage(9);
      } else if (window.innerHeight <= 1200) {
        setItemsPerPage(12);
      }
      // setItemsPerPage(aspectRatio < 1 ? 6 : 4); // Display more items if height > width
    };

    checkAspectRatio(); // Check on component mount
    window.addEventListener('resize', checkAspectRatio); // Adjust on window resize
    return () => window.removeEventListener('resize', checkAspectRatio);
  }, []);

  const fuse = new Fuse(data, {
    keys: ['username', 'name'],
    includeScore: true,
  });

  const handleSearch = (query) => {
    if (query) {
      setSearchResults(fuse.search(query).map((result) => result.item));
    } else {
      setSearchResults(data);
    }
    setCurrentPage(1);
  };

  // Function to update a user's role
  const updateUser = (updatedUser) => {
    setSearchResults((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Function to delete a user
  const deleteUser = (userId) => {
    setSearchResults((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 w-full p-4 h-full">
      <div className="flex flex-row pb-3">
        <h2 className="hidden md:flex text-xl text-gray-800 dark:text-gray-100 font-semibold items-center pr-5">
          {companyName}
          <FaChessKing
            className="hidden md:flex ml-5 text-amber-900 dark:text-amber-200"
            size={25}
          />
        </h2>
        <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold flex items-center pr-5">
          Total Company User: {data.length}/{upperUserLimit}
        </p>
        <button className="text-sm text-gray-800 dark:text-gray-800 font-semibold flex items-center px-4 py-2 bg-amber-300 dark:bg-amber-200 dark:hover:bg-amber-400 hover:bg-blue-600 rounded-md transition duration-300 ease-in-out">
          <FiPlusCircle className="mr-2" />
          Create New User
        </button>
      </div>
      <div className="flex flex-col h-full">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col h-full overflow-auto w-full">
          <table className="min-w-full text-gray-800 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-3 text-left">Display Name</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Position
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Gender
                </th>
                <th className="px-4 py-3 text-left">User Role</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="z-1">
              {currentItems.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  openModal={() => openModal(user)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={currentUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
      />

      <div className="flex justify-between items-center mt-4">
        <FiChevronLeft
          className="cursor-pointer dark:text-white"
          onClick={() => goToPage(currentPage - 1)}
          title="Previous Page"
        />
        <span className="dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <FiChevronRight
          className="cursor-pointer dark:text-white"
          onClick={() => goToPage(currentPage + 1)}
          title="Next Page"
        />
      </div>
    </div>
  );
};

export default UsersList;
