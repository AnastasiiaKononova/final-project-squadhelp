const yup = require('yup');

module.exports.catalogSchema = yup.object().shape({
  catalogName: yup.string().trim().required('Catalog name is required').min(1, 'Catalog name must be at least 1 character'),
});


