const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const authQueries = require('./queries/authQueries');
const { generateAccessToken } = require('../utils/jwtUtils');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const TokenError = require('../errors/TokenError');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await authQueries.findUser({ email: req.body.email });
    await authQueries.passwordCompare(req.body.password, foundUser.password);

    const accessToken = generateAccessToken(foundUser);
    await authQueries.updateUser({ accessToken }, foundUser.id);

    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await authQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass }),
    );

    const accessToken = generateAccessToken(newUser);
    await authQueries.updateUser({ accessToken }, newUser.id);

    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

module.exports.me = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new TokenError('Authorization token is required'));
  }

  const accessToken = authHeader.replace(/^Bearer\s+/i, '');

  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await authQueries.findUser({ id: tokenData.userId });

    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return next(new TokenError('User not found'));
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new TokenError('Invalid or expired token'));
    }

    next(err);
  }
};

