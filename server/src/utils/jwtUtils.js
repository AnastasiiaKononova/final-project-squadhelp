const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');

module.exports.generateAccessToken = (user) => jwt.sign({
  firstName: user.firstName,
  userId: user.id,
  role: user.role,
  lastName: user.lastName,
  avatar: user.avatar,
  displayName: user.displayName,
  balance: user.balance,
  email: user.email,
  rating: user.rating,
}, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
