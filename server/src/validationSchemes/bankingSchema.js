const yup = require('yup');
const cardTest = require('../utils/cardValidator');
const { contestSchema } = require('./contestSchema');

module.exports.paymentSchema = yup.object().shape({
  number: yup.string().trim().test('card-number', 'Credit Card number is invalid', cardTest('number')).required('Card number is required'),
  name: yup.string().trim().min(1, 'Name is required').required('Name is required'),
  cvc: yup.string().trim().test('cvc', 'CVC is invalid', cardTest('cvc')).required('CVC is required'),
  expiry: yup.string().trim().test('expiry', 'Expiry is invalid', cardTest('expiry')).required('Expiry date is required'),
  price: yup.number().positive('Price must be a positive number').required('Price is required'),
  contests: yup.array().of(contestSchema).min(1, 'At least one contest is required').required('Contests array is required'),
});

module.exports.cashoutSchema = yup.object().shape({
  sum: yup.number().min(5, 'Minimum cashout sum is $5').required('Sum is required'),
  number: yup.string().trim().test('card-number', 'Credit Card number is invalid', cardTest('number')).required('Card number is required'),
  name: yup.string().trim().min(1, 'Name is required').required('Name is required'),
  cvc: yup.string().trim().test('cvc', 'CVC is invalid', cardTest('cvc')).required('CVC is required'),
  expiry: yup.string().trim().test('expiry', 'Expiry is invalid', cardTest('expiry')).required('Expiry date is required'),
});

