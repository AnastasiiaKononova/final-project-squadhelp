import * as yup from 'yup';

export const catalogSchema = yup.object({ 
  catalogName: yup.string().trim().required('Catalog name is required').min(1, 'Catalog name must be at least 1 character'),
});