import * as yup from 'yup';
import { cardTest } from '../validators/validatorCard';

export const paymentSchema = yup.object().shape({
  number: yup.string().trim().test('card-number', 'Credit Card number is invalid', cardTest('number')).required('Card number is required'),
  name: yup.string().trim().min(1, 'Name is required').required('Name is required'),
  cvc: yup.string().trim().test('cvc', 'CVC is invalid', cardTest('cvc')).required('CVC is required'),
  expiry: yup.string().trim().test('expiry', 'Expiry is invalid', cardTest('expiry')).required('Expiry date is required'),
});

export const cashoutSchema = yup.object().shape({
  sum: yup.number().min(5, 'Minimum cashout sum is $5').required('Sum is required'),
  number: yup.string().trim().test('test-cardNumber', 'Credit Card number is invalid', cardTest('number')).required('Card number is required'),
  name: yup.string().trim().min(1, 'Name is required').required('Name is required'),
  cvc: yup.string().trim().test('cvc', 'CVC is invalid', cardTest('cvc')).required('CVC is required'),
  expiry: yup.string().trim().test('expiry', 'Expiry is invalid', cardTest('expiry')).required('Expiry date is required'),
});


