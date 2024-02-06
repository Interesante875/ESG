import React, { useEffect, useState } from 'react';
import { HiEye, HiX } from 'react-icons/hi';
import { IoIosInformationCircle } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import terms from '../../components/Auth/terms-and-conditions.json';
import { publicAxios } from '../../api/axios';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalBorderColor, setModalBorderColor] = useState('border-gray-300');

  const handleSignInPageClick = () => {
    navigate('/sign-in'); // Navigate to the home page
  };

  //The name, email, and password from the user input will be saved in this variable
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  //To show the error message to the user for a invalid email input
  const [error, setError] = useState([]);

  //To let the user peak the password input
  const [show, setShow] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  /**
   * To store the user input to variable values
   * @param {*} e
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setTermsChecked(checked);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  /**
   * To store the error message and show to the user
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example password strength validation
    if (passwordStrength !== 'Strong') {
      setError('Password is too weak.');
      return;
    }

    try {
      const response = await publicAxios.post(
        '/auth/register',
        JSON.stringify(values)
      );
      console.log(response.data);
      // Navigate on successful registration
      navigate('/info-success', { state: { from: location }, replace: true });
    } catch (err) {
      // Handle specific status codes
      if (err.response) {
        switch (err.response.status) {
          case 409:
            setError('Email Address has registered for an account already.');
            break;
          case 400:
            setError('Invalid request. Please check your input.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else if (err.request) {
        setError('The request was made but no response was received.');
      } else {
        setError('Error setting up the request.');
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
    setModalBorderColor('border-gray-300');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (showModal) {
      setModalBorderColor('border-red-500');
    }
  };

  // Include checks for password strength and adjust the `passwordStrength` state accordingly
  useEffect(() => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W|_).{8,}$/;
    if (strongPasswordRegex.test(values.password)) {
      setPasswordStrength('Strong');
      setError('');
    } else {
      setPasswordStrength('Weak');
      setError(
        'Password must be at least 8 characters long, including a number, uppercase letter, lowercase letter, and a special character.'
      );
    }

    const isFormValid =
      values.name &&
      values.email &&
      strongPasswordRegex.test(values.password) &&
      termsChecked;
    setSubmitDisabled(!isFormValid);
  }, [values, termsChecked]);

  return (
    <div className="max-h-screen bg-slate-50 container">
      <div className="h-screen flex-col flex justify-center items-start pl-32 pr-24 py-32">
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">
          Hello there!
        </div>
        <div className="hidden lg:flex text-zinc-800 w-9/12 h-auto text-m font-normal font-['Museo Sans']">
          Explore leading carbon management solutions with TranXEnergy&copy;
          {new Date().getFullYear()}. Streamline your carbon footprint tracking,
          reporting, and reduction strategies.{' '}
        </div>
        <br></br>
        <form className="w-10/12" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="full_name"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            {error.name ? (
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="font-['Inter'] bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-nonefocus:border-2"
              ></input>
            ) : (
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            )}
            {error.name && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal">
                {error.name}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            {error.email ? (
              <input
                type="email"
                placeholder="email@address.com"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                className="font-['Inter'] bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-red-500 focus:border-2"
              ></input>
            ) : (
              <input
                type="email"
                name="email"
                placeholder="email@address.com"
                value={values.email}
                id="email"
                onChange={handleChange}
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            )}
            {error.email && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal">
                {error.email}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white"
            >
              Password{' '}
              <span className="ml-1 text-red-600 flex">
                *{' '}
                <IoIosInformationCircle className="ml-2 text-black" size={20} />
              </span>
            </label>
            <div className="flex justify-end items-center relative">
              {error.password ? (
                <input
                  type={`${show ? 'text' : 'password'}`}
                  id="password"
                  name="password"
                  placeholder="Password must at least contain a number and a special character"
                  value={values.password}
                  onChange={handleChange}
                  className="bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-red-500 focus:border-2"
                ></input>
              ) : (
                <input
                  type={`${show ? 'text' : 'password'}`}
                  placeholder="Password must at least contain a number and a special character"
                  name="password"
                  value={values.password}
                  id="password"
                  onChange={handleChange}
                  className="bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              )}
              <span
                className="mr-3 mt-1 icon absolute"
                onClick={() => setShow(!show)}
              >
                <button>
                  <HiEye size={20} />
                </button>
              </span>
            </div>
            {/* Display password strength message */}
            {passwordStrength && (
              <div
                className={`message ${passwordStrength}`}
              >{`Password Strength: ${passwordStrength}`}</div>
            )}
            {error.password && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.password}
              </p>
            )}
          </div>
          <div className="flex items-center font-['Inter']  mt-3 mb-3">
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center">
              <input
                id="termsCheckbox"
                name="termsCheckbox"
                type="checkbox"
                checked={termsChecked}
                onChange={handleChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label
                htmlFor="termsCheckbox"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <span
                  className="text-teal-600 cursor-pointer"
                  onClick={openModal}
                >
                  Terms and Conditions
                </span>
                .
              </label>
            </div>

            {showModal && (
              <div
                className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${modalBorderColor}`}
              >
                <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold">Terms and Conditions</h4>
                    <div className="relative group">
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-800"
                      >
                        <HiX size={24} />
                      </button>
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Close
                      </span>
                    </div>
                  </div>
                  <div className="modal-content mb-4 overflow-y-scroll h-64 bg-slate-100">
                    {
                      /* Terms and conditions content here */
                      terms.sections.map((section, index) => (
                        <div key={index} className="pb-3 px-1">
                          <h3 className="text-semibold/loose">
                            {section.title}
                          </h3>
                          <p className="font-light">{section.content}</p>
                        </div>
                      ))
                    }
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    I have read them all
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitDisabled}
            className={`w-full text-white font-semibold h-12 px-10 py-2.5 ${
              submitDisabled ? 'bg-gray-300' : 'bg-teal-600 hover:bg-teal-800'
            } rounded-md`}
          >
            Register
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-2 text-center text-sm text-red-600">{error}</div>
          )}
        </form>
      </div>
      <div className="right-4 top-4 absolute justify-right items-center gap-3 inline-flex">
        <div className="text-teal-600 text-sm font-semibold font-['Inter'] leading-normal">
          Have an existing account?
        </div>

        <button
          className="h-10 px-4 py-2 rounded-md border border-teal-600 flex text-center text-teal-600 text-sm font-semibold font-['Inter'] leading-normal hover:bg-teal-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          onClick={handleSignInPageClick}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
