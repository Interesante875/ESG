
import { IoMdCheckmark } from "react-icons/io";

export default function CompanyInfo3() {
    return(
      <div>
  <div className='lg:px-60 md:px-12 pt-7 flex flex-col justify-center items-center gap-6 overflow-y-auto overflow-x-hidden'>
      <div className="flex justify-center items-center"> 
      <ol className="md:ml-10 lg:ml-8 w-full sm:flex">
          <li className="relative mb-6 sm:mb-0 ">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <IoMdCheckmark size={20} color="white"/>
                      </svg>
                  </div>
                  <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-teal-500 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-gray-300 dark:text-white">Step 1</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Company Details</p>
              </div>
          </li>
          <li className="relative mb-6 sm:mb-0 ">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <IoMdCheckmark size={20} color="white"/>
                      </svg>
                  </div>
                  <div className="hidden sm:flex md:w-[175px] lg:w-[200px] bg-teal-500 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-gray-300 dark:text-white">Step 2</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Certifications and Data</p>
              </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300 ring-1 ring-offset-1 ring-teal-500 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      </svg>
                  </div>
                  <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-teal-500 dark:text-white">Step 3</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Market Registration</p>
              </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      </svg>
                  </div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-gray-300 dark:text-white">Step 4</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Summary</p>
              </div>
          </li>
      </ol>
      </div>

      <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">Market Registration</div>
      <div className="text-zinc-800 text-xl font-normal font-['Inter'] text-center">Here's a summary of the information you've entered</div>
      
  </div>
   
      </div>
    )
}