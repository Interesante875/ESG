import React, { useState, useEffect } from 'react';
import { HiEye } from 'react-icons/hi';

const SignIn = () => {
  //The email and password from the user input will be saved in this variable
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //To show the error message to the user for a invalid email input
  const [error, setError] = useState([]);

  //Variable that will be used to let the user peak the password
  const [show, setShow] = useState(false);

  /**
   * To store the user input to variable values
   * @param {*} e
   */
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  /**
   * To store the error message and show to the user when the user click the button
   * @param {*} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    // setError(loginValidation(values));
  }

  return (
    <div className="max-h-screen bg-slate-50 container">
      <div className=" h-screen flex-col flex justify-center items-start pl-32 pr-24 py-32">
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">
          Welcome back!
        </div>

        <div className=" text-zinc-800 w-9/12 h-auto text-m font-normal font-['Museo Sans'] pt-5 pb-4">
          Login Portal of TranXEnergy Carbon Management Platform{' '}
        </div>

        <form className="w-10/12" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            {error.email ? (
              <input
                type="email"
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
              for="password"
              className="mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white"
            >
              Password <span className="ml-1 text-red-600 flex">*</span>
            </label>
            <div className="flex justify-end items-center relative">
              {error.password ? (
                <input
                  type={`${show ? 'text' : 'password'}`}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-red-500 focus:border-2"
                ></input>
              ) : (
                <input
                  type={`${show ? 'text' : 'password'}`}
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

            {error.password && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.password}
              </p>
            )}
          </div>
          <div className="font-['Inter'] grid grid-cols-3 gap-1">
            <div className="col-span-2 flex items-center justify-start">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              ></input>
              <label
                for="link-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="./forgot-password"
              className="text-sm text-right items-end text-teal-600 dark:text-teal-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <br></br>
          <button
            type="submit"
            className="w-full text-white text-xl font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Log In
          </button>
        </form>
      </div>
      <div className="right-4 top-4 absolute justify-right items-center gap-3 inline-flex">
        <div className="text-teal-600 text-sm font-semibold font-['Inter'] leading-normal">
          Don't have an account?
        </div>
        <a href="/sign-up">
          <button className="h-10 px-4 py-2 rounded-md border border-teal-600 flex text-center text-teal-600 text-sm font-semibold font-['Inter'] leading-normal hover:bg-teal-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
};

export default SignIn;
