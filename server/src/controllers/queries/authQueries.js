const bd = require('../../models');
const bcrypt = require('bcrypt');
const UserNotFoundError = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const UncorrectPassword = require('../../errors/UncorrectPassword');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data, { 
    where: { id: userId },
    returning: true,
    transaction });

  if (updatedCount !== 1 || !updatedUser) {
    throw new ServerError('Cannot update user');
  }

  return updatedUser.get({ plain: true });
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });

  if (!result) {
    throw new UserNotFoundError('User with specified data does not exist');
  }

  return result.get({ plain: true });
};

module.exports.userCreation = async (data) => {
  try {
    const newUser = await bd.Users.create(data);
    return newUser.get({ plain: true });
  } catch (err) {
    throw new ServerError('User creation failed');
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new UncorrectPassword('Wrong password');
  }
};
