/**
 * Page to reset password where user key in new password
 */
import { useState } from 'react';
// import {resetValidation} from '../validation.js'
import {HiEye} from 'react-icons/hi'

export default function ResetPassword() {
  /**
   * //The password from the user input will be saved in this variable
   */
  const [values, setValues] = useState({
    password:'',
    verify_password:''
  })
  //To show the error message to the user for a invalid email input
  const [error, setError] = useState('')

  //To let the user peak the password and verification password
  const [showPassword, setShowPassword] = useState(false)
  const [showVPassword, setShowVPassword] = useState(false)

  //To enable the button if the password and verification password matches
  const [submitDisabled, setSubmitDisabled] = useState(false)

  /**
   * To toggle the button disability and set the error message
   * @param {*} e  
   */
  function handleChange(e){
    e.preventDefault()
    if((values.password === values.verify_password) && values.password !== ''){ 
        setSubmitDisabled(true)
    }
    else{
        setSubmitDisabled(false)
    }

  }

  // function handleSubmit(e){
  //   e.preventDefault();
  //   // setError(resetValidation(values))

  // }

  return (
    <div className ="max-h-screen bg-slate-50 container">

        <div className="h-screen flex-col flex justify-center items-start  pl-12 pr-12 lg:pl-32 lg:pr-24 py-32">
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug">Reset Password</div> 
        <div className=" text-zinc-800 w-full lg:w-9/12 h-auto text-m font-normal font-['Museo Sans']">Hi {}! Enter your new desired password to continue.</div><br></br>
        <form className="w-full lg:w-10/12" onChange = {handleChange}>
            <div className="mb-5">
                <label for="password" className="block mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white">New Password  <span className="ml-1 text-red-600 flex">*</span></label>
                <div className="flex justify-end items-center relative">
                    {error.password ? <input type = {`${showPassword ? "text" : "password"}`} id = "password" name="password"  onChange={e => {values.password=e.target.value}} className="bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-red-500 focus:border-2"></input> :
                    <input type = {`${showPassword ? "text" : "password"}`}  name="password"  id = "password" onChange={e => {values.password=e.target.value}} className="bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "></input>}
                    
                   <span className = "mr-3 mt-1 icon absolute" onClick = {() => setShowPassword(!showPassword)}>
                            <button><HiEye size = {20}/></button>
                    </span>
                </div>
                
                {error.password && <p className = " text-red-500 font-['Inter] text-xs font-normal flex">{error.password}</p>}
            </div>
            

            <div className="mb-5">
                <label for="password" className="block mb-2 text-base font-extrabold flex font-['Inter'] text-white-900 dark:text-white">Re-enter New Password  <span className="ml-1 text-red-600 flex">*</span></label>
                <div className="flex justify-end items-center relative">

                    {error.vpassword ? <input type = {`${showVPassword ? "text" : "password"}`} id = "verify_password" name="verify_password"  onChange={e => {values.verify_password=e.target.value}} className="bg-white-50 border-2 border-red-500 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none focus:border-red-500 focus:border-2"></input> :
                    <input type = {`${showVPassword ? "text" : "password"}`}  name="verify_password"  id = "verify_password" onChange={e => {values.verify_password=e.target.value}} className="bg-white-50 border border-zinc-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>}
                    
                   <span className = "mr-3 mt-1 icon absolute" onClick = {() => setShowVPassword(!showVPassword)}>
                            <button><HiEye size = {20}/></button>
                    </span>
                </div>
                
                {error.vpassword && <p className = " text-red-500 font-['Inter] text-xs font-normal flex">{error.vpassword}</p>}
            </div><br></br>
            
            <button type="submit" disabled={!submitDisabled} className="w-full text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 disabled:bg-gray-200 disabled:text-gray-500">Continue</button>
          </form>
        </div>
        <div className="Frame1000004608 right-4 top-4 absolute justify-right items-center gap-3 inline-flex">
          <div className="text-teal-600 text-sm font-semibold font-['Inter'] leading-normal">Don't have an account?</div>
            <a href = "/signup"><button className="h-10 px-4 py-2 rounded-md border border-teal-600 flex text-center text-teal-600 text-sm font-semibold font-['Inter'] leading-normal hover:bg-teal-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Sign Up</button></a>
        </div>
      </div>
  );
}

