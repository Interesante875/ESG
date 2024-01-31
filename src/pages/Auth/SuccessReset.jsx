/**
 * Success message when the user has reset their password
 */

export default function SuccessReset() {

  return (
    <div className ="max-h-screen bg-slate-50 container">
        <div className="h-screen flex-col flex justify-center items-start lg:items-center pl-12 pr-12 lg:pl-32 lg:pr-24 py-32">
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] leading-snug    ">Success!</div> <br></br>
        <div className="text-zinc-800 w-full lg:w-9/12 h-auto text-m font-normal font-['Museo Sans']">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div><br></br><br></br>
        <button type="submit" className="w-full lg:w-9/12 text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Back to Login</button>
        
        </div>
        <div className="Frame1000004608 right-4 top-4 absolute justify-right items-center gap-3 inline-flex">
          <div className="text-teal-600 text-sm font-semibold font-['Inter'] leading-normal">Don't have an account?</div>
            <a href = "/signup"><button className="h-10 px-4 py-2 rounded-md border border-teal-600 flex text-center text-teal-600 text-sm font-semibold font-['Inter'] leading-normal hover:bg-teal-600 hover:text-white focus:ring-2 focus:outline-none focus:ring-teal-500 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">Sign Up</button></a>
        </div>
      </div>
  );
}

