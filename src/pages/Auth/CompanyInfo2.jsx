import { IoMdCheckmark } from 'react-icons/io';

export default function CompanyInfo2() {
  return (
    <div>
      <div className="lg:px-60 md:px-12 pt-7 flex flex-col justify-center items-center gap-6 overflow-y-auto overflow-x-hidden">
        <div className="flex justify-center items-center">
          <ol className="md:ml-10 lg:ml-8 w-full sm:flex">
            <li className="relative mb-6 sm:mb-0 ">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg
                    className="w-10/12 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <IoMdCheckmark size={20} color="white" />
                  </svg>
                </div>
                <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-teal-500 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-gray-300 dark:text-white">Step 1</h3>
                <p className="text-base font-semibold dark:text-gray-400">
                  Company Details
                </p>
              </div>
            </li>
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
                <div className="hidden sm:flex md:w-[170px] lg:w-[200px] bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                <h3 className="text-teal-500 dark:text-white">Step 2</h3>
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
          Certifications & Data
        </div>
        <div className="text-zinc-800 text-xl font-normal font-['Inter']">
          Please fill in your company details
        </div>
        <form className="w-10/12">
          <div className="mb-10">
            <p className="block mb-6 text-lg font-extrabold font-['Inter'] text-white-900 dark:text-white">
              SSM Certificate<span className="text-red-600"> *</span>
            </p>
            <label
              for="cert"
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="font-['Inter'] mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
              </div>
              <input id="cert" type="file" class="hidden" />
            </label>
          </div>

          <div className="font-['Inter'] grid grid-cols-3 gap-1 mb-12">
            <div className="col-span-2 flex items-center justify-start">
              <button className=" justify-center items-center h-12 px-10 py-2.5 rounded-md border border-teal-600 text-center text-teal-600 text-sm font-semibold font-['Inter'] hover:border-teal-800 hover:text-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                Back
              </button>
            </div>
            <div className="justify-end flex items-end">
              <button className=" text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
