const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');
const UncorrectPassword = require('../errors/UncorrectPassword');

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

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new UncorrectPassword('Wrong password');
  }
};

