const validators = require('./validators');
const CONSTANTS = require('../constants');

const offerTypeValidator = (req, res, next) => {

  const type = req.body.contestType;

  if (type === CONSTANTS.LOGO_CONTEST && req.file) {
    req.body.offerData = req.file;
  }

  switch (type) {
  case CONSTANTS.LOGO_CONTEST:
    return validators.validateLogoOffer(req, res, next);
  case CONSTANTS.TAGLINE_CONTEST:
  case CONSTANTS.NAME_CONTEST:
    return validators.validateTextOffer(req, res, next);
  default:
    return res.status(400).json({ message: 'Invalid contestType' });
  }
};

module.exports = offerTypeValidator;


