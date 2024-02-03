import React from 'react';
import { getNames } from 'country-list';

function StepOne({ formData, setFormData, nextStep }) {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate options for the country select
  const countryOptions = getNames().map((country) => ({
    value: country,
    label: country,
  }));

  return (
    // Use the full viewport height for the form container and improve inner spacing and layout
    <div className="flex items-center justify-center w-full h-full bg-gray-900 p-5">
      <form className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-10">
          Let's Get Started!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="firstname"
              type="text"
              placeholder="John"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="lastname"
              type="text"
              placeholder="Doe"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="fullname"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            id="fullname"
            type="text"
            placeholder="John Doe"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Gender Dropdown */}
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            className="block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded leading-tight focus:outline-none focus:bg-gray-600 px-4 py-3"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Country Dropdown */}
        {/* <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Contry <span className="text-red-500">*</span>
          </label>
          <select
            className="block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded leading-tight focus:outline-none focus:bg-gray-600 px-4 py-3"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Country</option>
            {countryOptions.map((source, index) => (
              <option key={index} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div> */}

        {/* Working Experience Dropdown */}
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="workingExperience"
          >
            Working Experience
          </label>
          <select
            className="block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded leading-tight focus:outline-none focus:bg-gray-600 px-4 py-3"
            id="workingExperience"
            name="workingExperience"
            value={formData.workingExperience}
            onChange={handleInputChange}
          >
            <option value="">Select Experience</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">More than 5 Years</option>
          </select>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default StepOne;
