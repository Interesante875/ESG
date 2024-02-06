const NavigationButtons = ({ pageNumber, setPageNumber, isLastPage }) => {
  // console.log('Is Last Page:', isLastPage);

  return (
    <div className="grid grid-cols-3 gap-1 mb-12">
      <div className="col-span-2 flex items-center justify-start">
        {pageNumber > 1 && (
          <button
            type="button"
            onClick={() => setPageNumber(pageNumber - 1)}
            className="justify-center items-center h-12 px-10 py-2.5 rounded-md border border-teal-600 text-center text-teal-600 text-sm font-semibold font-['Inter'] hover:border-teal-800 hover:text-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 dark:border-teal-300 dark:text-teal-100 dark:bg-teal-700 dark:hover:border-teal-400 dark:hover:bg-teal-800 dark:hover:text-white dark:focus:ring-teal-400"
          >
            Back
          </button>
        )}
      </div>
      <div className="justify-end flex items-end">
        <button
          type={isLastPage ? 'submit' : 'button'}
          onClick={(e) => {
            if (!isLastPage) {
              e.preventDefault();
              setPageNumber(pageNumber + 1);
            }
          }}
          className="text-white text-sm font-semibold h-12 px-10 py-2.5 bg-teal-600 hover:bg-teal-800 focus:ring-2 focus:outline-none focus:ring-teal-500 rounded-md dark:bg-teal-700 dark:hover:bg-teal-800 dark:text-teal-100 dark:hover:text-white dark:focus:ring-teal-400"
        >
          {isLastPage ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;
