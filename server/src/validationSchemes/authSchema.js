const yup = require('yup');

module.exports.registrationSchema = yup.object().shape({
  firstName: yup.string().trim().min(1, 'First Name is required').required('First Name is required'),
  lastName: yup.string().trim().min(1, 'Last Name is required').required('Last Name is required'),
  displayName: yup.string().trim().min(1, 'Display Name is required').required('Display Name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().trim().oneOf(['customer', 'creator'], 'Role must be either "customer" or "creator"').required('Role is required'),
});

module.exports.loginSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup.string().trim().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
