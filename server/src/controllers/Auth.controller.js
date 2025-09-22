const userQueries = require('./queries/userQueries');
const { generateAccessToken, passwordCompare } = require('../utils/authUtils');
const BadRequestError = require ('../errors/BadRequestError');

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    const valid = await passwordCompare(req.body.password, foundUser.password);
    if (!valid) {
      throw new BadRequestError('Invalid email or password');
    }

    const accessToken = generateAccessToken(foundUser);
    await userQueries.updateUser({ accessToken }, foundUser.id);

    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const { hashPass, body } = req;
    const newUser = await userQueries.userCreation({
      ...body,
      password: hashPass,
    });

    const accessToken = generateAccessToken(newUser);
    await userQueries.updateUser({ accessToken }, newUser.id);

    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};


module.exports.me = async (req, res, next) => {
  try {
    const { tokenData } = req;
    const foundUser = await userQueries.findUser({ id: tokenData.userId });

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
    next(err);
  }
};

