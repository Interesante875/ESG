import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  fullName: Yup.string().required('Full name is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'], 'Invalid gender')
    .required('Gender is required'),
  workingExperience: Yup.string(),
  companyName: Yup.string().required('Company name is required'),
  companyCategory: Yup.string().required('Company category is required'),
  companyRegNum: Yup.string().required('Registration number is required'),
  addressLine1: Yup.string().required('Address line 1 is required'),
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is required'),
  companySize: Yup.string().required('Company size is required'),
  contactNumber: Yup.string()
    .matches(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format')
    .min(5, 'Must be at least 5 digits')
    .required('Contact number is required'),
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default formSchema;
