import { FaChessKing } from 'react-icons/fa';
import { HiOutlinePencil } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../../components/Settings/ConfirmationModal';

const Settings = () => {
  const [values, setValues] = useState({
    displayname: 'Tan Wen Shan',
    firstname: 'Wen Shan',
    lastname: 'Tan',
    companyname: 'TransXEnergy',
    contact: '01123123',
    regno: '111111',
    email: 'a@gmail.com',
    password: 'fdsafafa',
  });

  const [originalValues, setOriginalValues] = useState(null);
  useEffect(() => {
    setOriginalValues(JSON.parse(JSON.stringify(values)));
  }, [values]);

  const [disabledValues, setDisabledValues] = useState({
    displayname: true,
    firstname: true,
    lastname: true,
    companyname: true,
    contact: true,
    regno: true,
    email: true,
    password: true,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fieldBeingEdited, setFieldBeingEdited] = useState(null);

  function handleDisableEdit(name) {
    setFieldBeingEdited(name);
    setShowConfirmModal(true);
  }

  function handleConfirmChange(confirm) {
    if (confirm) {
      // Update the database here
      console.log('Changes confirmed for:');
      setShowConfirmModal(false);
      setFieldBeingEdited(null);
    } else {
      //   // Revert the changes
      setValues((prevState) => ({
        ...prevState,
        [fieldBeingEdited]: originalValues[fieldBeingEdited],
      }));
    }
    setShowConfirmModal(false);
    setDisabledValues((prevState) => ({
      ...prevState,
      [fieldBeingEdited]: true,
    }));
    setFieldBeingEdited(null);
  }

  function handleClick(name) {
    setDisabledValues((prevState) => ({
      ...prevState,
      [name]: !disabledValues[name],
    }));

    if (disabledValues[name]) {
      // Update originalValues only when a field becomes editable
      setOriginalValues((prevOrigValues) => ({
        ...prevOrigValues,
        [name]: values[name],
      }));
    } else {
      // Focus on the input element
      setTimeout(() => {
        document.getElementById(name).focus();
      }, 0);
    }
  }

  /**
   * To store the user input to variable values
   * @param {*} e
   */
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col bg-slate-400 dark:bg-stone-800 w-full p-4 md:pl-10 overflow-y-auto">
      <div className="flex flex-row justify-start items-center">
        <p className="font-bold text-3xl text-slate-800 dark:text-amber-200">
          Profile
        </p>
        <FaChessKing
          className="text-slate-800 dark:text-amber-200 ml-5 mb-3 translate-y-1"
          size={30}
        />
      </div>
      <div className="mt-3 gap-0.5 mr-5">
        <div className="grid grid-cols-2 lg:w-96 md:w-80 items-center">
          <img
            src="/logo.svg"
            className="bg-white items-center justify-center flex w-24 h-24 rounded-full border border-black dark:border-white"
            alt="Company Logo"
          />

          <div className="flex lg:flex-row flex-col gap-2">
            <button className="bg-teal-600 hover:bg-teal-700 text-white h-12 px-5 py-3 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 shadow-md flex items-center justify-center text-sm font-semibold">
              Change picture
            </button>
            <button className="h-12 px-5 py-3 rounded-lg border border-teal-600 text-teal-600 hover:text-white hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 shadow-md transition duration-200 ease-in-out flex items-center justify-center text-sm font-semibold">
              Delete picture
            </button>
          </div>
        </div>
      </div>

      <form>
        <div className="my-5">
          <label
            htmlFor="displayname"
            className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
          >
            Display Name
            <button
              type="button"
              onClick={() => handleClick('displayname')}
              className="ml-2 text-gray-600 dark:text-amber-200 hover:text-gray-800"
            >
              <HiOutlinePencil />
            </button>
          </label>
          <input
            type="text"
            name="displayname"
            id="displayname"
            value={values.displayname}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
            onChange={handleChange}
            disabled={disabledValues.displayname ? true : null}
            onBlur={() => handleDisableEdit('displayname')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                handleDisableEdit('displayname');
              }
            }}
          />
        </div>

        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              First Name
              <button
                type="button"
                onClick={() => handleClick('firstname')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="text"
              name="firstname"
              value={values.firstname}
              id="firstname"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.firstname ? true : null}
              onBlur={() => handleDisableEdit('firstname')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('firstname');
                }
              }}
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              Last Name
              <button
                type="button"
                onClick={() => handleClick('lastname')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={values.lastname}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.lastname ? true : null}
              onBlur={() => handleDisableEdit('lastname')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('lastname');
                }
              }}
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="mb-5">
          <label
            htmlFor="companyname"
            className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
          >
            Company Name
            <button
              type="button"
              onClick={() => handleClick('companyname')}
              className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
            >
              <HiOutlinePencil />
            </button>
          </label>
          <input
            type="text"
            name="companyname"
            id="companyname"
            value={values.companyname}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
            onChange={handleChange}
            disabled={disabledValues.companyname ? true : null}
            onBlur={() => handleDisableEdit('companyname')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                handleDisableEdit('companyname');
              }
            }}
          />
        </div>

        {/* Company Contact No and Reg No */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Company Contact */}
          <div>
            <label
              htmlFor="contact"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              Company Contact No
              <button
                type="button"
                onClick={() => handleClick('contact')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="text"
              name="contact"
              id="contact"
              value={values.contact}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.contact ? true : null}
              onBlur={() => handleDisableEdit('contact')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('contact');
                }
              }}
            />
          </div>

          {/* Company Reg No */}
          <div>
            <label
              htmlFor="regno"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              Company Reg No
              <button
                type="button"
                onClick={() => handleClick('regno')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="text"
              name="regno"
              id="regno"
              value={values.regno}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.regno ? true : null}
              onBlur={() => handleDisableEdit('regno')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('regno');
                }
              }}
            />
          </div>
        </div>

        {/* Email and Password */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              Email
              <button
                type="button"
                onClick={() => handleClick('email')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.email ? true : null}
              onBlur={() => handleDisableEdit('email')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('email');
                }
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold mb-2 text-slate-800 dark:text-amber-200"
            >
              Password
              <button
                type="button"
                onClick={() => handleClick('password')}
                className="ml-2 text-gray-600 hover:text-gray-800 dark:text-amber-200"
              >
                <HiOutlinePencil />
              </button>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-teal-500"
              onChange={handleChange}
              disabled={disabledValues.password ? true : null}
              onBlur={() => handleDisableEdit('password')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  handleDisableEdit('password');
                }
              }}
            />
          </div>
        </div>
      </form>

      {showConfirmModal && (
        <ConfirmationModal
          message="Do you want to save the changes?"
          onConfirm={() => handleConfirmChange(true)}
          onCancel={() => handleConfirmChange(false)}
        />
      )}
      {/* <div>
        <p className="font-bold text-3xl flex flex-row justify-start items-center text-slate-800 dark:text-amber-200">
          Profile <FaChessKing className="ml-5 mb-3 translate-y-1" size={30} />
        </p>
        <div className="gap-0.5 mr-12">
          <div className="p-4">
            <div className="grid grid-cols-2 lg:w-96 md:w-80 items-center">
              <img
                src="/logo.svg"
                className="bg-white items-center justify-center flex w-24 h-24 rounded-full border border-black dark:border-white"
                alt="Company Logo"
              />
              <div>
                <button className="">Change picture</button>
                <button className="">Delete picture</button>
              </div>
            </div>
          </div>
        </div>

        <form className="lg:w-7/12 md:w-11/12">
          <div className="mb-5">
            <label for="displayname" className="">
              Display Name{' '}
              <button type="button" onClick={() => handleClick('displayname')}>
                <HiOutlinePencil className="" />
              </button>
            </label>
            <input
              type="text"
              name="displayname"
              id="displayname"
              value={values.displayname}
              className=""
              onChange={handleChange}
              disabled={disabledValues.displayname ? true : null}
            ></input>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-10 ">
            <div>
              <label for="firstname" className="">
                First Name{' '}
                <button type="button" onClick={() => handleClick('firstname')}>
                  <HiOutlinePencil />
                </button>
              </label>
              <input
                type="text"
                name="firstname"
                value={values.firstname}
                id="firstname"
                className=""
                onChange={handleChange}
                disabled={disabledValues.firstname ? true : null}
              ></input>
            </div>

            <div>
              <label for="lastname" className="">
                Last Name{' '}
                <button type="button" onClick={() => handleClick('lastname')}>
                  <HiOutlinePencil />
                </button>
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={values.lastname}
                className=""
                onChange={handleChange}
                disabled={disabledValues.lastname ? true : null}
              ></input>
            </div>
          </div>

          <div className="mb-5 gap-2 ">
            <label for="companyname" className="">
              Company Name{' '}
              <button type="button" onClick={() => handleClick('companyname')}>
                <HiOutlinePencil className />
              </button>
            </label>
            <input
              type="text"
              name="companyname"
              id="companyname"
              value={values.companyname}
              className=""
              onChange={handleChange}
              disabled={disabledValues.companyname ? true : null}
            ></input>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-10 ">
            <div>
              <label for="contact" className="">
                Company Contact No{' '}
                <button type="button" onClick={() => handleClick('contact')}>
                  <HiOutlinePencil />
                </button>
              </label>
              <input
                type="text"
                name="contact"
                id="contact"
                value={values.contact}
                className=""
                onChange={handleChange}
                disabled={disabledValues.contact ? true : null}
              ></input>
            </div>
            <div>
              <label for="regno" className="">
                Company Reg No{' '}
                <button type="button" onClick={() => handleClick('regno')}>
                  <HiOutlinePencil />
                </button>
              </label>
              <input
                type="text"
                name="regno"
                id="regno"
                value={values.regno}
                className=""
                onChange={handleChange}
                disabled={disabledValues.regno ? true : null}
              ></input>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-10 ">
            <div>
              <label for="email" className="">
                Email{' '}
                <button type="button" onClick={() => handleClick('email')}>
                  <HiOutlinePencil className="" />
                </button>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={values.email}
                className=""
                onChange={handleChange}
                disabled={disabledValues.email ? true : null}
              ></input>
            </div>

            <div>
              <label for="password" className="">
                Password{' '}
                <button type="button" onClick={() => handleClick('password')}>
                  <HiOutlinePencil className="" />
                </button>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                className=""
                onChange={handleChange}
                disabled={disabledValues.password ? true : null}
              ></input>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Settings;
