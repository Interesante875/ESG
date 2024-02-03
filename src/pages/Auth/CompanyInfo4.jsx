
import { IoMdCheckmark } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

export default function CompanyInfo4() {
    const [inputs, setInputs] = useState({
        "companyname":"",
        "regnumber":"",
        "address":"",
        "contact":"",
        "standard":""
    })

    const [disabledinputs, setDisabledInputs] = useState({
        "companyname":true,
        "regnumber":true,
        "address":true,
        "contact":true,
        "standard":true
    })

    function handleClick (name) {
        setDisabledInputs(prevState => ({...prevState, [name]: !disabledinputs[name]}))
    }

    function handleChange (evnt) {
        const { name, value } = evnt.target;
        setInputs({...inputs, [name]: value})
    }
    


    return(
      <div>
  <div className='lg:px-60 md:px-12 pt-7 flex flex-col justify-center items-center gap-6 overflow-y-auto overflow-x-hidden'>
      <div className="flex justify-center items-center"> 
      <ol className="md:ml-10 lg:ml-8 w-full sm:flex">
          <li className="relative mb-6 sm:mb-0 ">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <IoMdCheckmark size={20} color="white"/>
                      </svg>
                  </div>
                  <div className="hidden sm:flex md:w-[150px] lg:w-[200px] bg-teal-500 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-gray-300 dark:text-white">Step 3</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Market Registration</p>
              </div>
          </li>
          <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                  <div className="z-10 flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full ring-1 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                      <svg className="w-10/12 text-blue-800 dark:text-blue-300 ring-1 ring-offset-1 ring-teal-500 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      </svg>
                  </div>
              </div>
              <div className="mt-3 sm:pe-8">
                  <h3 className="text-teal-500 dark:text-white">Step 4</h3>
                  <p className="text-base font-semibold dark:text-gray-400">Summary</p>
              </div>
          </li>
      </ol>
      </div>

      <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">Summary</div>
      <div className="text-zinc-800 text-xl font-normal font-['Inter'] text-center">Here's a summary of the information you've entered</div>
      <form className="w-10/12">
      <div className="mb-10">
        <div className = "flex grid grid-cols-3 gap-1 ">
            <label for="companyname" className=" col-span-2 block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white">Company Name</label>
            
            <span className = "justify-end flex items-end mb-2">
                <button type="button" onClick = {() => handleClick("companyname")} className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div>
        <input type="text" name = "companyname" onChange ={handleChange} disabled={disabledinputs.companyname ? true : null} value  = {inputs.companyname} id = "companyname"  className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
        
       </div>
      <div className="mb-10">
        <div className = "flex grid grid-cols-3 gap-1 ">
        <label for="regnumber" className="col-span-2 block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white">Company Registration Number</label>
        <span className = "justify-end flex items-end mb-2">
                <button type="button" onClick = {() => handleClick("regnumber")} className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div>
        <input type="text" name = "regnumber" onChange ={handleChange} disabled={disabledinputs.regnumber ? true : null} value  = {inputs.regnumber}id = "regnumber"  className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
       </div>

       <div className="mb-10">
        <div className = "flex grid grid-cols-3 gap-1 ">
        <label for="address" className="col-span-2 block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white">Company Address</label>
        <span className = "justify-end flex items-end mb-2">
                <button type="button" onClick = {() => handleClick("address")} className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div>
        <input type="text" name = "address"  onChange ={handleChange} disabled={disabledinputs.address ? true : null} value  = {inputs.address} id = "address"  className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
       </div>

       <div className="mb-10">
        <div className = "flex grid grid-cols-3 gap-1 ">
        <label for="contact" className="col-span-2 block mb-2 text-base font-extrabold font-['Inter'] text-white-900 dark:text-white">Company PIC Contact</label>
        <span className = "justify-end flex items-end mb-2">
                <button type="button" onClick = {() => handleClick("contact")} className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div>
        <input type="text" name = "contact"  onChange ={handleChange} disabled={disabledinputs.contact ? true : null} value  = {inputs.contact} id = "contact"  className="font-['Inter'] bg-white-50 border border-zinc-300 text-white-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
       </div>
       
       <div className="mb-12">
        <div className = "flex grid grid-cols-3 gap-1 ">
          <label for="standard" className="col-span-2 block mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white">SSM Certificate</label>
          <span className = "justify-end flex items-end mb-2">
                <button type="button" className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div>
          
      </div>

      <div className="mb-12">
        <div className = "flex grid grid-cols-3 gap-1 ">
        <label for="standard" className="col-span-2 block mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white">ESG Standard</label>
          
          <span className = "justify-end flex items-end mb-2">
                <button type="button" onClick = {() => handleClick("standard")}className = "text-teal-600"><FaRegEdit size = {20}/></button>
            </span>
        </div><div className="flex justify-end items-center relative">
              <input type = 'text' name="standard" onChange ={handleChange} disabled={disabledinputs.standard ? true : null} value  = {inputs.standard} id = "standard" className="bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
      </div>

      
      

      {/* <div className="inline-flex flex-row mb-12"> */}
      <div className="flex font-['Inter'] grid grid-cols-3 gap-1 mb-12">
        <div className = "col-span-2 flex items-center justify-start">
          <button className="text-sm justify-center items-center h-12 px-10 py-2.5 rounded-md border border-teal-600 text-center text-teal-600 text-sm font-semibold font-['Inter'] hover:border-teal-800 hover:text-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Back</button>
        </div>
        <div className = "justify-end flex items-end">
        <button type="submit" className=" text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Submit</button>
        </div>
      </div>
    </form>
  </div>
   
      </div>
    )
}