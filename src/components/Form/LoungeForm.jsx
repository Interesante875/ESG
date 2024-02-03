import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

function LoungeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Add other fields as initialized empty strings or appropriate defaults
  });

  const [showModal, setShowModal] = useState(false);
  const [unfilledFields, setUnfilledFields] = useState([]);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const previousStep = () => setCurrentStep(currentStep - 1);

  const submitForm = () => {
    const requiredFields = [
      { name: 'firstname' },
      { name: 'lastname' },
      { name: 'fullname' },
      { name: 'gender' },
      { name: 'workingExperience' },
      { name: 'lastname' },
      { name: 'companyName' },
      { name: 'companyRegNumber' },
      { name: 'companyAddress' },
      { name: 'postalCode' },
      { name: 'city' },
      { name: 'companyCountry' },
      { name: 'companySize' },
      { name: 'companyContactNumber' },
      { name: 'companyContactEmail' },
      // Include all other required fields
    ];

    const unfilled = requiredFields.filter((field) => !formData[field.name]);
    if (unfilled.length > 0) {
      // Highlight the first unfilled field

      // Update state to show modal and list unfilled fields
      setShowModal(true);
      setUnfilledFields(unfilled.map((field) => field.name));
      console.log(formData);
      return; // Stop form submission
    }

    // Proceed with form submission if all fields are filled
    console.log(formData);
    setShowModal(false); // Ensure modal is hidden
    setUnfilledFields([]);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to render modal content
  const renderModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 backdrop-blur-md"></div>
        <div className="bg-white p-4 rounded-lg z-10">
          <h2 className="text-lg font-semibold mb-4">
            Required Fields Missing
          </h2>
          <ul className="list-disc ml-6">
            {unfilledFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  switch (currentStep) {
    case 1:
      return (
        <div className="flex min-h-full min-w-full">
          {showModal && renderModal()}
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        </div>
      );
    case 2:
      return (
        <div>
          {showModal && renderModal()}
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            previousStep={previousStep}
            submitForm={submitForm}
          />
        </div>
      );
    default:
      return (
        <>
          {showModal && renderModal()}
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        </>
      );
  }
}

export default LoungeForm;
