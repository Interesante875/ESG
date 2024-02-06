import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import axios from 'axios';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { getNames } from 'country-list';
import PageTitle from './PageTitle';
import PageSubtitle from './PageSubtitle';
import FormField from './FormField';
import NavigationButtons from './NavigationButtons';
import formSchema from './formSchema';
import FileDropZone from './FileDropZone';
import StepProgress from './StepProgress';
import SummaryDetails from './SummaryDetails';

const CompanyForm = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    firstName: '',
    lastName: '',
    fullName: '',
    gender: '',
    workingExperience: '',
    companyName: '',
    companyCategory: '',
    companyRegNum: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    companySize: '',
    contactNumber: '',
    contactEmail: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'companyName',
      'companyRegNum',
    ];
    const emptyFields = requiredFields.filter((field) => !values[field]);

    if (emptyFields.length > 0) {
      // Handle empty fields (e.g., show an error message)
      console.error('Required fields are empty:', emptyFields);
      return;
    }

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] && values[key].name) {
        // Assuming file fields are directly files and not FileLists
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    console.log('Form is submitting...', formData);

    let isMounted = true;

    const controller = new AbortController();

    try {
      // Use axiosPrivate for submitting form data
      const response = await axiosPrivate.post(
        '/upload/submit-form',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          signal: controller.signal,
        }
      );

      // Check if the component is still mounted before updating state
      if (isMounted) {
        console.log(response.data);
        // Handle successful submission (e.g., showing a success message, navigating to another page)
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request cancelled:', err.message);
      } else {
        console.error('Submission failed:', err);
        // Handle errors (e.g., showing error message, navigating on certain conditions)
        if (err.response) {
          const statusCode = err.response.status;
          if (statusCode === 401) {
            // Token has expired, redirect to sign-in page
            navigate('/sign-in', { state: { from: location }, replace: true });
          } else {
            // Handle other errors here
            console.error('Other error occurred:', err.response.data);
          }
        }
      }
    }

    if (isMounted) {
      setSubmitting(false); // Ensure form is re-enabled
    }

    // Cleanup function to prevent memory leaks and unwanted behavior
    return () => {
      isMounted = false;
      controller.abort(); // Cancel the request if the component unmounts
    };
  };

  const renderFormPage = (formikProps) => {
    switch (pageNumber) {
      case 1:
        return (
          <>
            <PageTitle>Personal Details</PageTitle>
            <PageSubtitle>Please fill in your personal details</PageSubtitle>
            {/* Using FormField component to render each field */}
            <FormField
              label="First Name"
              name="firstName"
              type="text"
              {...formikProps.getFieldProps('firstName')}
            />
            <FormField
              label="Last Name"
              name="lastName"
              type="text"
              {...formikProps.getFieldProps('lastName')}
            />
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              {...formikProps.getFieldProps('fullName')}
            />
            <FormField
              label="Gender"
              name="gender"
              type="select"
              {...formikProps.getFieldProps('gender')}
            >
              {/* Assuming gender options are predefined */}
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </FormField>
            <FormField
              label="Working Experience (Years)"
              name="workingExperience"
              type="select"
              {...formikProps.getFieldProps('workingExperience')}
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 year</option>
              <option value="2-5">2-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-20">11-20 years</option>
              <option value="21+">21+ years</option>
            </FormField>
          </>
        );
      // case 2, case 3, etc., for other pages
      case 2:
        return (
          <>
            <PageTitle>Company Details</PageTitle>
            <PageSubtitle>Please fill in your company details</PageSubtitle>
            <FormField
              label="Company Name"
              name="companyName"
              type="text"
              {...formikProps.getFieldProps('companyName')}
            />
            <FormField
              label="Company Registration Number"
              name="companyRegNum"
              type="text"
              {...formikProps.getFieldProps('companyRegNum')}
            />
            <FormField
              label="Address Line 1"
              name="addressLine1"
              type="text"
              {...formikProps.getFieldProps('addressLine1')}
            />
            <FormField
              label="Address Line 2"
              name="addressLine2"
              type="text"
              {...formikProps.getFieldProps('addressLine2')}
            />
            <FormField
              label="City"
              name="city"
              type="text"
              {...formikProps.getFieldProps('city')}
            />
            <FormField
              label="State"
              name="state"
              type="text"
              {...formikProps.getFieldProps('state')}
            />
            <FormField
              label="Postal Code"
              name="postalCode"
              type="text"
              {...formikProps.getFieldProps('postalCode')}
            />
            <FormField
              label="Country"
              name="country"
              type="select"
              {...formikProps.getFieldProps('country')}
            >
              {/* Populate with your countries */}
              <option value="">Select Country</option>
              {getNames().map((countryName) => (
                <option key={countryName} value={countryName}>
                  {countryName}
                </option>
              ))}
              {/* Add more countries as needed */}
            </FormField>
            <FormField
              label="Company Size"
              name="companySize"
              type="select"
              {...formikProps.getFieldProps('companySize')}
            >
              <option value="">Select Size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-100">51-100 employees</option>
              <option value="101-300">101-300 employees</option>
              <option value="301-1000">301-1000 employees</option>
              <option value="1000+">1000+ employees</option>
              {/* Add more size options as needed */}
            </FormField>
            <FormField
              label="Company Category"
              name="companyCategory"
              type="select"
              {...formikProps.getFieldProps('companyCategory')}
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
              <option value="oil">Oil & Gas</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="food">Food and Beverage</option>
              <option value="realestate">Real Estate</option>
              <option value="automotive">Automotive</option>
              <option value="travel">Travel and Tourism</option>
              <option value="hospitality">Hospitality</option>
              <option value="agriculture">Agriculture</option>
              <option value="nonprofit">Non-Profit Organizations</option>
              <option value="sports">Sports and Recreation</option>
              <option value="fashion">Fashion and Apparel</option>
              <option value="telecommunications">Telecommunications</option>
              <option value="energy">Energy and Utilities</option>
              <option value="pharmaceuticals">Pharmaceuticals</option>
              <option value="construction">Construction</option>
              <option value="transportation">Transportation</option>
              <option value="ecommerce">E-commerce</option>
              <option value="media">Media and Publishing</option>
              <option value="government">Government and Public Services</option>
              <option value="environmental">Environmental Services</option>
              <option value="others">Others</option>
              {/* Add more categories as needed */}
            </FormField>
            <FormField
              label="Contact Number"
              name="contactNumber"
              type="tel"
              {...formikProps.getFieldProps('contactNumber')}
            />
            <FormField
              label="Contact Email"
              name="contactEmail"
              type="email"
              {...formikProps.getFieldProps('contactEmail')}
            />
          </>
        );
      case 3:
        return (
          <>
            <PageTitle>SSM Certificate</PageTitle>
            <PageSubtitle>
              Submit your SSM registered certificate for verification
            </PageSubtitle>
            <FileDropZone name="ssmCertificate" />
          </>
        );
      case 4:
        // Summary page for review
        return <SummaryDetails formikProps={formikProps} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <>
      <StepProgress pageNumber={pageNumber} />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            {renderFormPage(formikProps)}

            <NavigationButtons
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              isLastPage={pageNumber === 4}
              {...formikProps}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanyForm;
