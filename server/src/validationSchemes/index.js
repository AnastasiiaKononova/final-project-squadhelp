const { registrationSchema, loginSchema } = require('./authSchema');
const { cashoutSchema, paymentSchema } = require('./bankingSchema');
const { catalogSchema } = require('./catalogSchema');
const { contestSchema } = require('./contestSchema');
const { messageSchema } = require('./messageSchema');
const { logoOfferSchema, textOfferSchema } = require('./offerSchema');
const { updateUserSchema } = require('./userSchema');

module.exports = {
  registrationSchema,
  loginSchema,
  cashoutSchema,
  paymentSchema,
  catalogSchema,
  contestSchema,
  messageSchema,
  logoOfferSchema,
  textOfferSchema,
  updateUserSchema,
};
