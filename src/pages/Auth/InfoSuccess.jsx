export default function InfoSuccess() {
    return(
      <div className="max-h-screen bg-slate-50 container">
        <div className='h-screen flex-col flex justify-center items-start lg:items-center pl-12 pr-12 lg:pl-32 lg:pr-24 py-32'>
        <div className="text-zinc-800 text-4xl font-bold font-['Inter'] mb-3 leading-snug">Success!</div>
        <div className="lg:w-2/3 mt-2 mb-12 text-zinc-800 text-xl font-normal font-['Inter']">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        <a className="justify-center text-center items-center flex w-full lg:w-2/3 text-white text-sm font-semibold font-['Inter'] h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" href = "login"><button  >Back to Login</button></a>
        </div>   
      </div>
    )
}