const bd = require('../../models');
const ServerError = require('../../errors/ServerError');

const _updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('Cannot update mark on this offer');
  }
  return updatedRating.get({ plain: true });
};

const _createRating = async (data, transaction) => {
  try {
    const result = await bd.Ratings.create(data, { transaction });
    return result.get({ plain: true });
  } catch {
    throw new ServerError('Cannot mark offer');
  }
};

module.exports.createOrUpdateRating = async (data, transaction) => {
  const { offerId, userId, isFirst } = data;
  return isFirst ? _createRating(data, transaction) : _updateRating(data, { offerId, userId }, transaction);
};

module.exports.calcRatingAvgByUser = async (userId, transaction) => {
  const offersArray = await bd.Ratings.findAll({
    include: [
      {
        model: bd.Offers,
        required: true,
        where: { userId },
      },
    ],
    transaction,
  });
  const sum = offersArray.reduce((acc, curr) => acc + curr.dataValues.mark, 0);
  return offersArray.length ? (sum/offersArray.length) : 0 ;
};

