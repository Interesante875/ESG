import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';

const AccountInfoModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    companyName: '', // Assuming these values are fetched or set as constants
    email: '',
    userRole: '', // Example roles: Editor/Admin/Company Admin/Standard
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsername = async () => {
      try {
        const response = await axiosPrivate.get('/user/get-userinfo', {
          signal: controller.signal,
        });
        // console.log(response.data);
        if (isMounted) {
          setFormData({
            ...response.data,
          });
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // Log for debugging purposes
          // console.log('Request cancelled:', err.message);
        } else {
          console.error('Request failed:', err);
          // Only navigate if the error was not a cancellation
          navigate('/sign-in', { state: { from: location }, replace: true });
        }
      }
    };

    getUsername();

    return () => {
      isMounted = false;
      controller.abort();
      // console.log('Cleanup: Cancelled any ongoing requests.');
    };
  }, [navigate, location, axiosPrivate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Optionally validate input and set errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    let newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';

    if (Object.keys(newErrors).length === 0) {
      console.log('Submitting data...', formData);
      let isMounted = true;

      const controller = new AbortController();
      try {
        const values = {
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

        const response = await axiosPrivate.post(
          '/user/update-userinfo',
          values,
          {
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          }
        );

        if (isMounted) {
          // console.log(response.data);
          closeModal();
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
      // Here, handle the submission logic
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center px-4 py-8">
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-lg w-full space-y-6"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Edit Account Info
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Form fields */}
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out ${
                  key === 'companyName' || key === 'email' || key === 'userRole'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-white'
                }`}
                required={!['companyName', 'email', 'userRole'].includes(key)}
                disabled={['companyName', 'email', 'userRole'].includes(key)}
              />
              {errors[key] && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 ease-in-out"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInfoModal;
