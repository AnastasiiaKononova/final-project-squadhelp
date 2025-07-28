const yup = require('yup');

module.exports.registrationSchema = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup.string().matches(/(customer|creator)/).required(),
});

module.exports.loginSchema = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

const contestSchema = yup.object().shape({
  contestType: yup.string().matches(/(name|logo|tagline)/).required(),
  fileName: yup.string().min(1),
  originalFileName: yup.string().min(1),
  title: yup.string().required().min(1),
  typeOfName: yup.string().min(1),
  industry: yup.string().required().min(1),
  focusOfWork: yup.string().required().min(1),
  targetCustomer: yup.string().required().min(1),
  styleName: yup.string().min(1),
  nameVenture: yup.string().min(1),
  typeOfTagline: yup.string().min(1),
  brandStyle: yup.string().min(1),
});

module.exports.contestSchema = contestSchema;

module.exports.paymentSchema = yup.object().shape({
  number: yup.string().trim().matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Card number must be in format "1234 5678 9012 3456"')
    .required('Card number is required'),
  cvc: yup.string().matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits')
    .required('CVC is required'),
  expiry: yup.string().matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry must be in MM/YY format')
    .required('Expiry date is required'),
  price: yup.number().positive('Price must be a positive number')
    .required('Price is required'),
  contests: yup.array().of(contestSchema).min(1, 'At least one contest is required')
    .required('Contests array is required'),
});

