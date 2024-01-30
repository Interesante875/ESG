import React, { useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();

  const handleSearch = () => {
    onSearch(searchValue);
    inputRef.current?.blur();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mb-4 shadow-lg rounded overflow-hidden">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="p-2 w-full bg-white dark:text-white dark:bg-gray-700 border-none focus:ring-2 focus:ring-teal-500 transition-colors"
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-teal-500 dark:bg-teal-700 text-white p-2 hover:bg-teal-600 dark:hover:bg-teal-800 transition-colors"
        onClick={handleSearch}
      >
        <FiSearch className="text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
