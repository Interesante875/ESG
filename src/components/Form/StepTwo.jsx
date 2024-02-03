import { getNames } from 'country-list';

function StepTwo({ formData, setFormData, previousStep, submitForm }) {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const countryOptions = getNames().map((country) => (
    <option key={country} value={country}>
      {country}
    </option>
  ));

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 p-4">
      <form className="w-full max-w-xl md:max-w-4xl bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
          Company Information
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simplified layout to a single column for improved mobile experience */}

          {/* Company Name */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyName"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Registration Number */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="companyRegNumber"
            >
              Company Registration Number{' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyRegNumber"
              type="text"
              name="companyRegNumber"
              value={formData.companyRegNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Address */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2 lg:col-span-2"
              htmlFor="companyAddress"
            >
              Company Address <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyAddress"
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Postal Code */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="postalCode"
            >
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* City */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Country Located */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2 lg:col-span-2"
              htmlFor="companyCountry"
            >
              Company Country Located <span className="text-red-500">*</span>
            </label>
            <select
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyCountry"
              name="companyCountry"
              value={formData.companyCountry}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Country</option>
              {countryOptions}
            </select>
          </div>

          {/* Company Size Dropdown */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2 lg:col-span-2"
              htmlFor="companySize"
            >
              Company Size <span className="text-red-500">*</span>
            </label>
            <select
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Size</option>
              <option value="1-10">1-10 Employees</option>
              <option value="11-50">11-50 Employees</option>
              <option value="51-200">51-200 Employees</option>
              <option value="201-500">201-500 Employees</option>
              <option value="501-1000">501-1000 Employees</option>
              <option value="1001+">1001+ Employees</option>
            </select>
          </div>

          {/* Company Contact Number */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="companyContactNumber"
            >
              Company Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyContactNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              name="companyContactNumber"
              value={formData.companyContactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Contact Email */}
          <div>
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="companyContactEmail"
            >
              Company Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600"
              id="companyContactEmail"
              type="email"
              name="companyContactEmail"
              value={formData.companyContactEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 lg:col-span-2">
            <button
              type="button"
              onClick={previousStep}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
            <button
              type="button"
              onClick={submitForm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StepTwo;
