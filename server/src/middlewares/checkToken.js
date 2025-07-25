const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');

module.exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new TokenError('Authorization token is required'));
  }

  const accessToken = authHeader.replace(/^Bearer\s+/i, '');

  try {
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    next();
  } catch (err) {
    next(new TokenError('Invalid or expired token'));
  }
};
