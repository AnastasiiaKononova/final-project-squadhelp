const { registrationSchema, loginSchema, contestSchema, paymentSchema, messageSchema } = require('../validationSchemes/schemes');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateContestCreation = async (req, res, next) => {
  try {
    const promiseArray = req.body.contests.map(el => contestSchema.isValid(el));
    const results = await Promise.all(promiseArray);

    const isAllValid = results.every(valid => valid === true);
    if (!isAllValid) {
      return next(new BadRequestError('One or more contests are invalid'));
    }
    next();
  } catch (err) {
    next(err);
  }
};

const validateWithSchema = (schema, options = {}) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, options);
      next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Invalid data: ${err.errors?.[0] || err.message}`));
      }
      next(new ServerError());
    }
  };
};

module.exports.validateRegistrationData = validateWithSchema(registrationSchema);
module.exports.validateLogin = validateWithSchema(loginSchema);
module.exports.validatePayment = validateWithSchema(paymentSchema);
module.exports.validateMessageBody = validateWithSchema(messageSchema);
