const db = require('../../models');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');
const NotUniqueEmailError = require('../../errors/NotUniqueEmail');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await db.User.update(data, {
    where: { id: userId },
    returning: true,
    transaction });

  if (updatedCount !== 1 || !updatedUser) {
    throw new ServerError('Cannot update user');
  }

  return updatedUser.get({ plain: true });
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await db.User.findOne({ where: predicate, transaction });

  if (!result) {
    throw new NotFoundError('User not found');
  }

  return result.get({ plain: true });
};

module.exports.userCreation = async (data) => {
  try {
    const newUser = await db.User.create(data);
    return newUser.get({ plain: true });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new NotUniqueEmailError();
    }
    throw new ServerError();
  }
};

module.exports.getUsersByIds = async function (ids) {
  return await db.User.findAll({
    where: { id: ids },
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
};

module.exports.findUserWithLock = async (userId, transaction) => {
  const user = await db.User.findOne({
    where: { id: userId },
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};
