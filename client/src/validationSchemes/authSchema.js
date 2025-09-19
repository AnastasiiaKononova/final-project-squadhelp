import * as yup from 'yup';

export const registrationSchema = yup.object().shape({ 
  email: yup.string().trim().email('Invalid email format').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('confirm password is required'),
  firstName: yup.string().trim().min(1, 'First Name is required').required('First Name is required'),
  lastName: yup.string().trim().min(1, 'Last Name is required').required('Last Name is required'),
  displayName: yup.string().trim().min(1, 'Display Name is required').required('Display Name is required'),
  role: yup.string().trim().oneOf(['customer', 'creator'], 'Role must be either "customer" or "creator"').required('Role is required'),
  agreeOfTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('Must Accept Terms and Conditions'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email format').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('required'),
});