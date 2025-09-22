import * as yup from 'yup';

export const updateUserSchema = yup.object().shape({ 
  firstName: yup.string().trim().min(1, 'First Name required').required('First Name required'),
  lastName: yup.string().trim().min(1, 'Last Name required').required('Last Name required'),
  displayName: yup.string().trim().min(1, 'Display Name required').required('Display Name required'),
  file: yup.mixed(),  
});
