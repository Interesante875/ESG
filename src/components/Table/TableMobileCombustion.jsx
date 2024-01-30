import { PiPlusSquare } from 'react-icons/pi';
import { CiPaperplane } from 'react-icons/ci';
import { LiaPencilAltSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';

const TableMobileCombustion = () => {
  //Boolean value to show or hide the modal
  const [showModal, setShowModal] = useState(false);

  //Boolean value to show or hide the modal for delete confirmation
  const [deleteModal, setDeleteModal] = useState(false);

  //Selected index where users are taking action (edit)
  const [rowIndex, setRowIndex] = useState(0);

  //The data of the table
  const [rowsData, setRowsData] = useState([]);

  //The selected rows by the user from ticking the checkboxes
  const [selectedRows, setSelectedRows] = useState([]);

  //To check whether user is adding a new row or editing the current existing row
  const [addEditMode, setAddEditMode] = useState('add');

  //To check if the user tick the checkbox that select all rows
  const [selectAllRows, setSelectAllRows] = useState(false);

  //Temporary data that will be used to update existing data or push if the user is adding a new row
  const [tempData, setTempData] = useState({
    type: ' ',
    source: ' ',
    unit: ' ',
    quantity: '',
    location: '',
    details: '',
  });

  /**
   * To set the related variable and show the modal when user is editing a row
   * @param {*} idx array index where the user is taking an action
   */
  function editTableRow(idx) {
    setAddEditMode('edit');
    setRowIndex(idx);
    setShowModal(true);
    setTempData(rowsData[idx]);
  }

  /**
   * To delete either single, multiple, or all rows depending on the user
   */
  function deleteTableRows() {
    if (selectAllRows) {
      setRowsData([]);
      setSelectAllRows(false);
    } else {
      const newData = rowsData.filter((row, i) => !selectedRows.includes(i));
      setRowsData(newData);
      setSelectedRows([]);
    }

    setDeleteModal(false);
  }

  /**
   * To reset the temporary data into default and close the modal
   */
  function resetModal() {
    setTempData({
      type: ' ',
      source: ' ',
      unit: ' ',
      quantity: '',
      location: '',
      details: '',
    });
    setShowModal(false);
    setAddEditMode('add');
  }

  /**
   * To handle the change when the user fill in the inputs in the modal
   * @param {*} evnt
   */
  function handleChange(evnt) {
    const { name, value } = evnt.target;
    setTempData({ ...tempData, [name]: value });
  }

  /**
   * To either add a row or edit the existing row from the data
   */
  function submitModal() {
    if (addEditMode === 'add') {
      setRowsData([...rowsData, tempData]);
    } else {
      const rowsInput = [...rowsData];
      rowsInput[rowIndex] = tempData;
      setRowsData(rowsInput);
    }

    resetModal();
  }

  /**
   * To handle when the single, multiple, or all checkboxes are ticked
   * @param {*} idx
   */
  function handleRowSelection(idx) {
    if (idx === 'all') {
      setSelectAllRows(!selectAllRows);
    } else {
      if (selectedRows.includes(idx)) {
        setSelectedRows(selectedRows.filter((id) => id !== idx));
      } else {
        setSelectedRows([...selectedRows, idx]);
      }
    }
  }

  function sourceOption() {
    switch (tempData.type) {
      case 'Car':
        return ['Petrol', 'Diesel'];
      case 'Motorcycle':
        return ['Petrol'];
      case 'Bus':
        return ['Diesel'];
      default:
        return ['Petrol', 'Diesel'];
    }
  }

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="ml-52 font-['Inter'] pt-12 overflow-y-auto sm:rounded-lg">
        <div className="flex justify-end items-start gap-6 ml-10 mt-5 fixed lg:text-lg md:text-base font-semibold dark:text-white">
          {' '}
          Mobile Combustion Data Table
        </div>
        <div className="flex gap-5 lg:right-4 md:ml-8 lg:mt-5 fixed md:mt-14">
          <button
            type="button"
            className="font-semibold text-white text-sm border flex justify-center items-center rounded-md px-3 py-1 gap-2 bg-brightgreen dark:bg-darkgreen hover:bg-darkgreen hover:dark:bg-green-800"
            onClick={() => setShowModal(true)}
          >
            <PiPlusSquare />
            Add Row
          </button>
          <button
            type="button"
            className={
              selectedRows.length || selectAllRows
                ? 'font-semibold text-white text-sm border flex justify-center items-center rounded-md px-3 py-1 gap-2 bg-red-600 dark:bg-red-700 hover:bg-red-800 hover:dark:bg-red-900'
                : 'hidden'
            }
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete />
            Delete selected rows
          </button>
          <button
            type="submit"
            className="font-semibold text-white text-sm border flex justify-center items-center rounded-md px-3 py-1 gap-2 bg-brightgreen dark:bg-darkgreen hover:bg-darkgreen hover:dark:bg-green-800"
          >
            <CiPaperplane />
            Submit
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-16 md:mt-28 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
            <tr className="border-b-2 border-black dark:border-white ">
              <th scope="col" className="lg:pl-4 md:pl-2 py-1 lg:w-12 md:w-8">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={selectAllRows}
                    onChange={() => handleRowSelection('all')}
                    className="lg:w-4 lg:h-4 md:w-3 md:h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-40 md:w-1/5"
              >
                Type
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-40 md:w-1/5"
              >
                Source
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-40 md:w-1/6"
              >
                Unit
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-40 md:w-1/6"
              >
                Qty.
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-56 md:w-1/4"
              >
                Location
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-3 md:py-1 lg:w-56 md:w-1/4"
              >
                Details
              </th>
              <th
                scope="col"
                className="lg:px-6 lg:py-2 md:px-1 md:py-1 md:w-1/6"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsData?.map((row, i) => (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="lg:pl-4 md:pl-2 py-1 lg:w-12 md:w-8 ">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="lg:w-4 lg:h-4 md:w-3 md:h-3  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                      checked={selectedRows.includes(i) || selectAllRows}
                      onChange={() => handleRowSelection(i)}
                    ></input>
                    <label for="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="lg:px-6 lg:py-2 md:px-3 md:py-1  font-medium text-gray-900  dark:text-white "
                >
                  {row.type}
                </th>
                <td className="lg:px-6 lg:py-2 md:px-3 md:py-1 ">
                  {row.source}
                </td>
                <td className="lg:px-6 lg:py-2 md:px-3 md:py-1 ">{row.unit}</td>
                <td className="lg:px-6 lg:py-2 md:px-3 md:py-1 ">
                  {row.quantity}
                </td>
                <td className="lg:px-6 lg:py-2 md:px-3 md:py-1 overflow-x-clip ">
                  {row.location}
                </td>
                <td className="lg:px-6 lg:py-2 md:px-3 md:py-1 overflow-x-clip ">
                  {row.details}
                </td>
                <td className="flex items-center lg:px-6 lg:py-2 md:px-0 md:py-1 ">
                  <button
                    type="button"
                    className="font-medium text-blue-600 dark:text-blue-800 hover:underline rounded-full border p-1 bg-blue-200"
                    onClick={() => editTableRow(i)}
                  >
                    <LiaPencilAltSolid className="lg:w-4 lg:h-4 md:w-3 md:h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <!-- Add new row modal --> */}
        {showModal ? (
          <div className="backdrop-blur-sm fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <form className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a new row
                  </h3>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Type
                      </label>
                      <select
                        defaultValue={tempData.type}
                        onChange={handleChange}
                        name="type"
                        id="type"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value=" " disabled hidden>
                          Select Type
                        </option>
                        <option value="Car">Car</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Bus">Bus</option>
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="source"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Source
                      </label>
                      <select
                        onChange={handleChange}
                        defaultValue={tempData.source}
                        name="source"
                        id="source"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value=" " disabled hidden>
                          Select Source
                        </option>
                        {sourceOption()?.map((row, i) => (
                          <option key={i} value={row}>
                            {row}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="unit"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Unit
                      </label>
                      <select
                        onChange={handleChange}
                        defaultValue={tempData.unit}
                        name="unit"
                        id="unit"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value=" " disabled hidden>
                          Select Unit
                        </option>
                        <option value="Litres">Litres</option>
                        <option value="Kilometres">Kilometres</option>
                      </select>
                    </div>
                    <div className="scol-span-6 sm:col-span-3">
                      <label
                        for="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        onChange={handleChange}
                        value={tempData.quantity}
                        type="text"
                        name="quantity"
                        id="quantity"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                    </div>
                    <div className="col-span-6">
                      <label
                        for="location"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        onChange={handleChange}
                        value={tempData.location}
                        type="text"
                        name="location"
                        id="location"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                    </div>
                    <div className="col-span-6">
                      <label
                        for="details"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Details (Optional)
                      </label>
                      <textarea
                        onChange={handleChange}
                        value={tempData.details}
                        type="text"
                        name="details"
                        id="details"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    onClick={submitModal}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        {/* <!-- Modal for discarding all row --> */}
        {deleteModal ? (
          <div
            id="deleteModal"
            className="backdrop-blur-sm fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto ">
              {/* <!-- Modal content --> */}
              <div className="relative border border-gray-600 p-4 text-center bg-white rounded-lg shadow dark:bg-gray-700 sm:p-5">
                <button
                  type="button"
                  onClick={() => setDeleteModal(false)}
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete the selected rows?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setDeleteModal(false)}
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    type="button"
                    onClick={deleteTableRows}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableMobileCombustion;
