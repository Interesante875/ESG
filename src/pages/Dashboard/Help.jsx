import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SearchBar from '../../components/Help/Searchbar';
import Fuse from 'fuse.js';

const helpData = [
  {
    id: 1,
    question: 'How do I reset my password?',
    meta: 'Instructions for resetting a forgotten password.',
    createdAt: '2022-01-01',
    Ans: <div>Follow these steps to reset your password...</div>,
  },
  {
    id: 2,
    question: 'Where can I find my purchase history?',
    meta: 'Guide to finding your previous transactions and purchases.',
    createdAt: '2022-01-05',
    Ans: <div>Your purchase history is located in...</div>,
  },
  {
    id: 3,
    question: 'How do I update my profile information?',
    meta: 'Updating your personal and contact information.',
    createdAt: '2022-01-10',
    Ans: <div>To update your profile information...</div>,
  },
  {
    id: 4,
    question: 'What is the refund policy?',
    meta: 'Understanding the terms for returning products and getting refunds.',
    createdAt: '2022-01-15',
    Ans: <div>Our refund policy states that...</div>,
  },
  {
    id: 5,
    question: 'How do I contact customer support?',
    meta: 'Various ways to get in touch with our support team.',
    createdAt: '2022-01-20',
    Ans: <div>You can contact customer support by...</div>,
  },
  {
    id: 6,
    question: 'Is my data secure?',
    meta: 'Information on how we protect your data and privacy.',
    createdAt: '2022-01-25',
    Ans: <div>We ensure your data is secure by...</div>,
  },
  {
    id: 7,
    question: 'How to change notification settings?',
    meta: 'Managing the frequency and types of notifications you receive.',
    createdAt: '2022-02-01',
    Ans: <div>To change your notification settings...</div>,
  },
  {
    id: 8,
    question: 'Can I share my account with others?',
    meta: 'Policy on account sharing and multiple users.',
    createdAt: '2022-02-05',
    Ans: <div>Our policy on account sharing is...</div>,
  },
  {
    id: 9,
    question: 'How to cancel a subscription?',
    meta: 'Steps to cancel your ongoing subscription services.',
    createdAt: '2022-02-10',
    Ans: <div>To cancel your subscription...</div>,
  },
  {
    id: 10,
    question: 'What are the system requirements?',
    meta: 'Minimum and recommended system specs for optimal usage.',
    createdAt: '2022-02-15',
    Ans: <div>The system requirements are...</div>,
  },
];

const Help = () => {
  const data = helpData;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(data);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = searchResults.slice(firstIndex, lastIndex);

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
      if (window.innerHeight <= 600) {
        setItemsPerPage(4);
      } else if (window.innerHeight <= 800) {
        setItemsPerPage(6);
      } else if (window.innerHeight <= 1000) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(10);
      }
      // setItemsPerPage(aspectRatio < 1 ? 6 : 4); // Display more items if height > width
    };

    checkAspectRatio(); // Check on component mount
    window.addEventListener('resize', checkAspectRatio); // Adjust on window resize
    return () => window.removeEventListener('resize', checkAspectRatio);
  }, []);

  const fuse = new Fuse(data, {
    keys: ['question', 'meta'],
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

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 w-full p-4">
      <div className="flex flex-col h-full">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col h-full overflow-y-auto">
          {currentItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/help/${item.id}`}
              className="p-3 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Question: ${item.question}`}
            >
              <h2 className="md:text-xl text-base text-gray-800 dark:text-gray-200 dark:hover:text-gray-500 font-semibold">
                {truncateText(item.question, 100)}
              </h2>
              <p className="hidden md:flex font-light text-gray-600 dark:text-gray-300 md:text-sm">
                {truncateText(item.meta, 200)}
              </p>
            </NavLink>
          ))}
        </div>
      </div>

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

export default Help;
