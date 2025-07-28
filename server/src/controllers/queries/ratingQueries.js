const bd = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('Cannot update mark on this offer');
  }
  return updatedRating.get({ plain: true });
};

module.exports.createRating = async (data, transaction) => {
  try {
    const result = await bd.Ratings.create(data, {transaction});
    return result.get({ plain: true });
  } catch {
    throw new ServerError('Cannot mark offer')
  }
};
 

