import { useState } from 'react';

export default function CompanyInfo1() {
  //The variables from the user input will be saved in this variable
  const [values, setValues] = useState({
    name: '',
    regnumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    category: '',
    contact: '',
  });

  //To show the error message to the user for a invalid email input
  const [error, setError] = useState([]);

  // const navigate = useNavigate()  //To navigate to other page

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
    // setError(InfoValidation1(values))

    // console.log(InfoValidation1(values))
    // //to check if there are any errors on the input field during submission
    // let condition = Object.values(InfoValidation1(values)).every(value => value === '');

    // if(condition){
    //     navigate(`/companyinfo2`)
    // }
  }

  return (
    <div>
      <div className="lg:px-60 md:px-12 pt-7 flex flex-col justify-center items-center gap-6 overflow-y-auto overflow-x-hidden">
        <div className="flex justify-center items-center">
          <ol className="md:ml-10 lg:ml-8 w-full sm:flex">
            <li className="relative mb-6 sm:mb-0 ">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg
                    className="w-10/12 text-blue-800 dark:text-blue-300 ring-1 ring-offset-1 ring-teal-500 rounded-full"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
                <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-teal-500 dark:text-white">Step 1</h3>
                <p className="text-base font-semibold dark:text-gray-400">
                  Company Details
                </p>
              </div>
            </li>
            <li className="mb-6 sm:mb-0 ">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
                <div className="hidden sm:flex md:w-[170px] lg:w-[200px] bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-gray-300 dark:text-white">Step 2</h3>
                <p className="text-base font-semibold dark:text-gray-400">
                  Certification and Data
                </p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
                <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-gray-300 dark:text-white">Step 3</h3>
                <p className="text-base font-semibold dark:text-gray-400">
                  Market Registration
                </p>
              </div>
            </li>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  ></svg>
                </div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-gray-300 dark:text-white">Step 4</h3>
                <p className="text-base font-semibold dark:text-gray-400">
                  Summary
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">
          Company Details
        </div>
        <div className="text-zinc-800 text-xl font-normal font-['Inter']">
          Please fill in your company details
        </div>
        <form className="w-10/12" onSubmit={handleSubmit}>
          <div className="mb-10">
            <label
              for="name"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Company Name<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            {error.name && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.name}
              </p>
            )}
          </div>
          <div className="mb-10">
            <label
              for="regnumber"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Company Registration Number
              <span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              name="regnumber"
              id="regnumber"
              value={values.regnumber}
              onChange={handleChange}
              className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            {error.regnumber && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.regnumber}
              </p>
            )}
          </div>
          <div className="mb-10">
            <label
              for="address"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Company Address<span className="text-red-600"> *</span>
            </label>
            <div className="grid grid-rows-4 grid-cols-2 gap-4">
              <input
                type="text"
                name="address1"
                id="address1"
                value={values.address1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="row-span-1 col-span-2 font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <input
                type="text"
                name="address2"
                id="address2"
                value={values.address2}
                onChange={handleChange}
                placeholder="Address Line 2 (Optional)"
                className="row-span-1 col-span-2 font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <input
                type="text"
                name="city"
                id="city"
                value={values.city}
                onChange={handleChange}
                placeholder="City/District"
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <input
                type="text"
                name="state"
                id="state"
                value={values.state}
                onChange={handleChange}
                placeholder="State/Province"
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <input
                type="text"
                name="postal"
                id="postal"
                value={values.postal}
                onChange={handleChange}
                placeholder="Postal Code"
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <input
                type="text"
                name="country"
                id="country"
                value={values.country}
                onChange={handleChange}
                placeholder="Country"
                className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
            {error.address && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.address}
              </p>
            )}
          </div>
          <div className="mb-10">
            <label
              for="name"
              className="block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white"
            >
              Company Category<span className="text-red-600"> *</span>
            </label>
            {/* <input type="name" name = "name"  id = "name"  className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input> */}
            <select
              name="category"
              id="category"
              value={values.category}
              onChange={handleChange}
              className="font-['Inter'] invalid:text-gray-500 border border-zinc-300 rounded-md focus:ring-teal-600 focus:border-teal-600 block w-full p-3 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value=" " hidden selected>
                Select Tariff Category Here
              </option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
              <option value="oil">Oil & Gas</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
            {error.category && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.category}
              </p>
            )}
          </div>
          <div className="mb-12">
            <label
              for="contact"
              className="mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white"
            >
              Contact Number<span className="ml-1 text-red-600 flex"> *</span>
            </label>
            <div className="flex justify-end items-center relative">
              <input
                type="text"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                id="contact"
                className="bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
            {error.contact && (
              <p className=" text-red-500 font-['Inter] text-xs font-normal flex">
                {error.contact}
              </p>
            )}
          </div>
          {/* <div className="inline-flex flex-row mb-12"> */}
          <div className="font-['Inter'] grid grid-cols-3 gap-1 mb-12">
            <div className="col-span-2 flex items-center justify-start">
              <button className="justify-center items-center h-12 px-10 py-2.5 rounded-md border border-teal-600 text-center text-teal-600 text-sm font-semibold font-['Inter'] hover:border-teal-800 hover:text-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                Back
              </button>
            </div>
            <div className="justify-end flex items-end">
              <button
                type="submit"
                className=" text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
