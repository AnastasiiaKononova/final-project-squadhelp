const bd = require('../../models');
const UserNotFoundError = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');

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

module.exports.getUsersByIds = async function (ids) {
  return await bd.Users.findAll({
    where: { id: ids },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

module.exports.findUserWithLock = async (userId, transaction) => {
  const user = await bd.Users.findOne({
    where: { id: userId },
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!user) {
    throw new UserNotFoundError('User not found');
  }

  return user;
};
