
import * as  Yup from 'yup'

export const validatePhoneNumber = Yup.object().shape({
  number: Yup.string()
  .matches(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 digits',
    excludeEmptyString: true, 
  })
  .required('Phone number is required')
  });
  export const validateOtp = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
      .required('OTP is required')
      .min(4, 'Must be more than 4  digits')
      .max(6, 'Must be less than 6 digits'),
  });

  export const validateSignup = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, ' at least 2 characters')
      .max(25, ' at most 50 characters'),
    
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, ' least 2 characters')
      .max(25, ' most 50 characters'),
    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  
  });
  
  
  const validations =  {
    validatePhoneNumber,
    validateOtp,
    validateSignup
}

export default validations