const yup = require('yup');

module.exports.contestSchema = yup.object().shape({
  contestType: yup.string().matches(/(name|tagline|logo)/).required('Contest type required'),
  title: yup.string().trim().min(1, 'Title is required').required('Title is required'),
  typeOfName: yup.string().trim().min(1),
  industry: yup.string().trim().min(1, 'Industry is required').required('Industry is required'),
  focusOfWork: yup.string().trim().min(1, 'Focus of work is required').required('Focus of work is required'),
  targetCustomer: yup.string().trim().min(1, 'Target customer is required').required('Target customer is required'),
  styleName: yup.string().trim().min(1),
  nameVenture: yup.string().trim().min(3).required('Name venture is required'),
  typeOfTagline: yup.string().trim().min(1),
  brandStyle: yup.string().trim().min(1),
});
