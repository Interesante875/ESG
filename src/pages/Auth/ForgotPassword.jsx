/**
 * Forgot password page where user will input email address
 */

import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [values, setValues] = useState({
    email: '',
  }); //The email from the user input will be saved in this variable
  const navigate = useNavigate(); //To navigate to other page
  const [error, setError] = useState([]); //To show the error message to the user for a invalid email input

  /**
   * To store the user input to variable values
   * @param {*} e
   */
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  /**
   * To store the error message and show to the user
   * @param {*} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    // setError(forgotValidation(values))

    // if(forgotValidation(values).email === ''){
    //   navigate(`/fourdigitcode?email=${values.email}`)
    // }
  }

  return (
    <div className="max-h-screen bg-slate-50 container">
      <div className="h-screen flex-col flex justify-center items-start  pl-12 pr-12 lg:pl-32 lg:pr-24 py-32">
        <div>
          <a href="/sign-in">
            <button className="justify-center items-center flex text-black-300 mb-16">
              <FaAngleLeft />
              <span className="ml-3">Back to Login</span>
            </button>
          </a>
        </div>
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">
          Forgot your password?
        </div>
        <div className="text-zinc-800 w-full lg:w-9/12 h-auto text-m font-normal font-['Museo Sans']">
          Reset password
        </div>
        <br></br>
        <form className="w-full lg:w-10/12" onSubmit={handleSubmit}>
          <div className="mb-5 ">
            <label
              for="email"
              className="leading-loose block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
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
          <br></br>

          <button
            type="submit"
            className="justify-center text-center items-center flex w-full text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            Send Verification Email
          </button>
        </form>
      </div>
      <div className="Frame1000004608 right-4 top-4 absolute justify-right items-center gap-3 inline-flex">
        <div className="text-teal-600 text-sm font-semibold font-['Inter'] leading-normal">
          Don't have an account?
        </div>
        <a href="/signup">
          <button className="h-10 px-4 py-2 rounded-md border border-teal-600 flex text-center text-teal-600 text-sm font-semibold font-['Inter'] leading-normal hover:bg-teal-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
}
