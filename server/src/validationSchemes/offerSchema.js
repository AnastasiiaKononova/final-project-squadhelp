const yup = require('yup');

module.exports.logoOfferSchema = yup.object().shape({
  offerData: yup.mixed().required('Required'),
});

module.exports.textOfferSchema = yup.object().shape({
  offerData: yup.string().required('Suggestion is required').min(1),
});


