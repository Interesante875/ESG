import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { publicAxios } from '../../api/axios';
import { FaAngleLeft } from 'react-icons/fa';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ password: '', verify_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showVPassword, setShowVPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // Validate token on component mount
  useEffect(() => {
    publicAxios
      .get(`/auth/validate-reset-token/${token}`)
      .then((response) => {
        // Assuming the API sends back a specific message or status code when the token is valid
        if (response.status === 200) {
          // Token is valid, proceed with the reset password functionality
          setError(''); // Clear any previous errors
        }
      })
      .catch((error) => {
        let message = 'An unexpected error occurred. Please try again later.';
        if (error.response) {
          // Handle known error status codes
          switch (error.response.status) {
            case 404:
              message = 'Token is invalid or has expired.';
              break;
            case 400:
              message = 'Invalid request. Please check your input.';
              break;
            default:
              break; // Keep the default error message
          }
        }

        setError(message); // Set the appropriate error message

        // Optionally, use state to pass error message to navigate target
        navigate('/sign-in', {
          state: { from: location, errorMessage: message },
          replace: true,
        });
      });
  }, [token, navigate, location]);

  useEffect(() => {
    const strongPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const isValid =
      strongPasswordRegex.test(values.password) &&
      values.password === values.verify_password;
    setSubmitDisabled(!isValid);
    if (isValid) setError('');
    else if (values.password !== values.verify_password)
      setError("Passwords don't match.");
    else
      setError(
        'Password must include uppercase, lowercase, number, symbol, and be at least 8 characters long.'
      );
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitDisabled) return; // Early return if form is not valid

    try {
      const response = await publicAxios.post('/auth/reset-password', {
        token,
        password: values.password,
      });

      // Check if the API might send a specific response for successful password reset
      if (response.status === 200) {
        navigate('/success-reset', { replace: true });
      } else {
        // Handle unexpected successful response codes other than 200, if necessary
        setError(
          'Password reset was successful, but an unexpected status was received. Please verify if the reset was effective.'
        );
      }
    } catch (error) {
      let errorMessage = 'Failed to reset password, please try again.';

      if (error.response) {
        // Handle known error status codes
        switch (error.response.status) {
          case 400:
            errorMessage =
              'Invalid request. Please ensure the password meets all requirements.';
            break;
          case 404:
            errorMessage = 'Reset token is invalid or has expired.';
            break;
          case 500:
            errorMessage = 'Server error occurred. Please try again later.';
            break;
          default:
            errorMessage = `An unexpected error occurred. Status code: ${error.response.status}`;
            break;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage =
          'The request was made but no response was received, check your network connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = 'Error setting up the request.';
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="bg-slate-50 flex flex-col justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <NavLink
        to="/sign-in"
        className="self-start mb-16 text-teal-600 hover:text-teal-800 flex items-center"
      >
        <FaAngleLeft />
        <span className="ml-3">Back to Login</span>
      </NavLink>
      <div className="w-full max-w-md">
        <h1 className="text-zinc-800 text-3xl sm:text-4xl font-bold mb-6">
          Reset Password
        </h1>
        <p className="text-zinc-800 mb-6">
          Enter your new desired password below.
        </p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="font-bold text-zinc-800 block mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="verify_password"
              className="font-bold text-zinc-800 block mb-2"
            >
              Re-enter New Password
            </label>
            <div className="relative">
              <input
                type={showVPassword ? 'text' : 'password'}
                name="verify_password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowVPassword(!showVPassword)}
              >
                {showVPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitDisabled}
            className="w-full p-2 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 disabled:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="max-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
  //     <a href="/sign-in" className="self-start mb-16">
  //       <button className="flex items-center text-black-300">
  //         <FaAngleLeft />
  //         <span className="ml-3">Back to Login</span>
  //       </button>
  //     </a>
  //     <div className="w-full max-w-md">
  //       <h1 className="text-zinc-800 text-3xl sm:text-4xl font-bold leading-snug">
  //         Reset Password
  //       </h1>
  //       <p className="text-zinc-800 mt-2 mb-6">
  //         Enter your new desired password below.
  //       </p>
  //       {error && <div className="text-red-500 mb-4">{error}</div>}
  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         <div className="mb-4">
  //           <label htmlFor="password" className="font-bold text-zinc-800">
  //             New Password
  //           </label>
  //           <div className="relative">
  //             <input
  //               type={showPassword ? 'text' : 'password'}
  //               name="password"
  //               onChange={handleChange}
  //               className="w-full p-2 border rounded-md"
  //             />
  //             <span
  //               className="absolute right-2 top-2 cursor-pointer"
  //               onClick={() => setShowPassword(!showPassword)}
  //             >
  //               {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
  //             </span>
  //           </div>
  //         </div>
  //         <div className="mb-4">
  //           <label
  //             htmlFor="verify_password"
  //             className="font-bold text-zinc-800"
  //           >
  //             Re-enter New Password
  //           </label>
  //           <div className="relative">
  //             <input
  //               type={showVPassword ? 'text' : 'password'}
  //               name="verify_password"
  //               onChange={handleChange}
  //               className="w-full p-2 border rounded-md"
  //             />
  //             <span
  //               className="absolute right-2 top-2 cursor-pointer"
  //               onClick={() => setShowVPassword(!showVPassword)}
  //             >
  //               {showVPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
  //             </span>
  //           </div>
  //         </div>
  //         <button
  //           type="submit"
  //           disabled={submitDisabled}
  //           className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:bg-gray-300"
  //         >
  //           Reset Password
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
