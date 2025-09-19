const {
  registrationSchema,
  loginSchema,
  contestSchema,
  paymentSchema,
  cashoutSchema,
  messageSchema,
  catalogSchema,
  logoOfferSchema,
  textOfferSchema,
  updateUserSchema,
} = require('../validationSchemes');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const formYupErrors = require('../utils/formYupErrors');

const validateWithSchema = (schema, options = {}) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false, ...options });
      next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Invalid data', 400, formYupErrors(err)),
        );
      }
      next(new ServerError());
    }
  };
};

const validateArrayOfSchema = (schema, fieldName) => {
  return async (req, res, next) => {
    try {
      const items = req.body[fieldName];
      if (!Array.isArray(items) || items.length === 0) {
        return next(new BadRequestError(`${fieldName} must be a non-empty array`));
      }

      const results = await Promise.all(
        items.map(async (item) => {
          try {
            await schema.validate(item, { abortEarly: false });
            return null;
          } catch (err) {
            if (err.name === 'ValidationError') return formYupErrors(err);
            throw err;
          }
        }),
      );

      const errors = results.filter(Boolean);
      if (errors.length > 0) {
        return next(new BadRequestError(`Invalid ${fieldName}`, 400, errors));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  validateRegistrationData: validateWithSchema(registrationSchema),
  validateLogin: validateWithSchema(loginSchema),
  validatePayment: validateWithSchema(paymentSchema),
  validateCashout: validateWithSchema(cashoutSchema),
  validateMessageBody: validateWithSchema(messageSchema),
  validateCatalog: validateWithSchema(catalogSchema),
  validateLogoOffer: validateWithSchema(logoOfferSchema),
  validateTextOffer: validateWithSchema(textOfferSchema),
  validateUpdateUser: validateWithSchema(updateUserSchema),
  validateContestCreation: validateArrayOfSchema(contestSchema, 'contests'),
};
