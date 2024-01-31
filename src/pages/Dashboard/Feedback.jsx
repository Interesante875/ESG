import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

const Feedback = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    name: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isModalVisible) {
      timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isModalVisible]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      console.log('Form data submitted:', formData);
      setFormData({
        title: '',
        description: '',
        name: '',
        email: '',
      });
      setFormErrors({});
      setIsModalVisible(true);
      // Here you would typically send the data to a server or handle it as needed
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = 'Title is required';
    if (!data.description) errors.description = 'Description is required';
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };

  const NotificationPopup = () => (
    <div
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-2 cursor-pointer"
      onClick={closeModal}
    >
      <p className="text-black dark:text-white text-lg">
        Feedback successfully submitted!
      </p>
      <FiX className="text-black dark:text-white text-lg" />
    </div>
  );

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex w-full max-w-full max-h-full bg-slate-400 dark:bg-stone-800 text-black dark:text-white h-full">
      <form onSubmit={handleSubmit} className="flex flex-col p-4 m-1 w-full">
        <div className="pb-2 mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-base font-bold mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="text-lg bg-white dark:text-white border-none focus:ring-2 focus:ring-teal-500 transition-colors dark:bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
          />
          {formErrors.title && (
            <p className="text-red-500 text-sm italic">{formErrors.title}</p>
          )}
        </div>

        <div className="pb-2 mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-base font-bold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-lg bg-white dark:text-white  border-none focus:ring-2 focus:ring-teal-500 transition-colors dark:bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm italic">{formErrors.name}</p>
          )}
        </div>

        <div className="pb-2 mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-base font-bold mb-2">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-lg bg-white dark:text-white  border-none focus:ring-2 focus:ring-teal-500 transition-colors dark:bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email Address"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm italic">{formErrors.email}</p>
          )}
        </div>

        <div className="pb-2 mb-4">
          <label className="block text-gray-700 dark:text-gray-200 text-base font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="text-lg bg-white dark:bg-gray-700 dark:text-white border-none focus:ring-2 focus:ring-teal-500 transition-colors shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Describe the issue"
            rows="4" // Adjust the number of rows as needed
          />
          {formErrors.description && (
            <p className="text-red-500 text-sm italic">
              {formErrors.description}
            </p>
          )}
        </div>
        {/* Repeat similar structure for Description, Name, and Email fields */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

      {isModalVisible && <NotificationPopup />}
    </div>
  );
};

export default Feedback;
